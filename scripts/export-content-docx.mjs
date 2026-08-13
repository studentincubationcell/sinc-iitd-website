/**
 * Generates content-review/SInC-Website-Content.docx for team review.
 * Run: node scripts/export-content-docx.mjs
 * Tip: run export-content-review.mjs first to refresh ALL-CONTENT.md
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  PageBreak,
  BorderStyle,
} from "docx";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const reviewDir = join(root, "content-review");
const outPath = join(reviewDir, "SInC-Website-Content.docx");

// Refresh markdown if export script exists
const exportScript = join(root, "scripts", "export-content-review.mjs");
if (existsSync(exportScript)) {
  execSync("node scripts/export-content-review.mjs", { cwd: root, stdio: "inherit" });
}

function parseInline(text) {
  const runs = [];
  const re = /\*\*(.+?)\*\*|(`[^`]+`)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      runs.push(new TextRun({ text: text.slice(last, m.index) }));
    }
    if (m[1]) {
      runs.push(new TextRun({ text: m[1], bold: true }));
    } else if (m[2]) {
      runs.push(new TextRun({ text: m[2].replace(/`/g, ""), font: "Consolas" }));
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    runs.push(new TextRun({ text: text.slice(last) }));
  }
  return runs.length ? runs : [new TextRun({ text })];
}

function bullet(text, level = 0) {
  return new Paragraph({
    bullet: { level },
    spacing: { after: 80 },
    children: parseInline(text.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "")),
  });
}

function body(text) {
  return new Paragraph({
    spacing: { after: 120 },
    children: parseInline(text),
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 200 },
    children: [new TextRun({ text, bold: true, size: 32 })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 160 },
    children: [new TextRun({ text, bold: true, size: 28 })],
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 120 },
    children: [new TextRun({ text, bold: true, size: 24 })],
  });
}

function mdToParagraphs(md) {
  const lines = md.split(/\r?\n/);
  const out = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      out.push(new Paragraph({ spacing: { after: 80 }, children: [] }));
      continue;
    }
    if (trimmed.startsWith("<a id=")) continue;
    if (trimmed === "---") {
      out.push(new Paragraph({ children: [new PageBreak()] }));
      continue;
    }
    if (trimmed.startsWith("# ")) {
      out.push(h1(trimmed.slice(2)));
      continue;
    }
    if (trimmed.startsWith("## ")) {
      out.push(h2(trimmed.slice(3)));
      continue;
    }
    if (trimmed.startsWith("### ")) {
      out.push(h3(trimmed.slice(4)));
      continue;
    }
    if (trimmed.startsWith("> ")) {
      out.push(
        new Paragraph({
          spacing: { after: 120 },
          indent: { left: 360 },
          children: parseInline(trimmed.slice(2)),
        })
      );
      continue;
    }
    if (/^[-*]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      out.push(bullet(trimmed));
      continue;
    }
    out.push(body(trimmed));
  }

  return out;
}

const generated = new Date().toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const cover = [
  new Paragraph({ spacing: { before: 2400 }, children: [] }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text: "SInC IIT Delhi", bold: true, size: 56 }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [
      new TextRun({ text: "Website — All Content", bold: true, size: 40 }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
    children: [
      new TextRun({ text: "Team content review document", size: 24, color: "666666" }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: `Generated ${generated}`, size: 22, italics: true })],
  }),
  new Paragraph({ spacing: { before: 800 }, children: [] }),
  new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({
        text: "How to use this document",
        bold: true,
        size: 26,
      }),
    ],
  }),
  bullet("Read each section — it mirrors every page on the live website."),
  bullet("Fill in or replace placeholder text (marked TODO or in brackets)."),
  bullet("Use the Content Checklist at the end for priority items."),
  bullet("After updates, share changes with the web team or edit data/*.json directly."),
  new Paragraph({ children: [new PageBreak()] }),
];

const checklistMd = readFileSync(join(reviewDir, "CONTENT-CHECKLIST.md"), "utf8");
const allContentMd = readFileSync(join(reviewDir, "ALL-CONTENT.md"), "utf8");

// Strip TOC links block for cleaner doc (keep section headers in body)
const mainMd = allContentMd.replace(/^## Table of contents[\s\S]*?^---\s*\n/m, "");

const checklistSection = [
  new Paragraph({ children: [new PageBreak()] }),
  h1("Content checklist — what to fill in"),
  ...mdToParagraphs(checklistMd.replace(/^# .+\n\n/, "")),
];

const doc = new Document({
  creator: "SInC IIT Delhi",
  title: "SInC Website — All Content",
  description: "Complete website copy for team review and content updates",
  sections: [
    {
      properties: {},
      children: [
        ...cover,
        ...mdToParagraphs(mainMd),
        ...checklistSection,
        new Paragraph({
          spacing: { before: 400 },
          border: { top: { style: BorderStyle.SINGLE, size: 6, color: "CCCCCC" } },
          children: [
            new TextRun({
              text: "End of document · sinc.iitd.ac.in · Edit data/*.json then run: node scripts/export-content-review.mjs",
              size: 18,
              color: "888888",
            }),
          ],
        }),
      ],
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
writeFileSync(outPath, buffer);
console.log("wrote", outPath);
