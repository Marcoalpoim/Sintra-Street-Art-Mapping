import fs from "fs";
import path from "path";
import sharp from "sharp";

// Root folder with all your images
const rootDir = "fotosstreetart";

// Target max width and compression level
const maxWidth = 1600; // pixels
const quality = 70; // JPEG/WebP quality (0–100)

function compressImages(folder) {
  const entries = fs.readdirSync(folder, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(folder, entry.name);

    if (entry.isDirectory()) {
      compressImages(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

    const backupPath = fullPath + ".bak";

    // Skip if already processed
    if (fs.existsSync(backupPath)) {
      console.log("⚠️ Skipping (already optimized):", entry.name);
      continue;
    }

    // Make a backup copy first
    fs.copyFileSync(fullPath, backupPath);

    // Compress and overwrite
    sharp(fullPath)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .jpeg({ quality, progressive: true })
      .toBuffer()
      .then(data => {
        fs.writeFileSync(fullPath, data);
        console.log("✅ Compressed:", fullPath);
      })
      .catch(err => {
        console.error("❌ Error processing", fullPath, err);
        fs.copyFileSync(backupPath, fullPath); // restore backup if fails
      });
  }
}

compressImages(rootDir);

