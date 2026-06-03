
const fs = require("fs");

const path = require("path");

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://wbdcbmrathhgwsvfdnpy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZGNibXJhdGhoZ3dzdmZkbnB5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTg0NjQzNCwiZXhwIjoyMDk1NDIyNDM0fQ.39KbwTJMcexwJVTZfmuXKtq20sDy4e0hsJ-Q-c3vYj4"
);

const folderPath =
  "/Users/leoneena/Desktop/ElectionFiles";

const files = fs.readdirSync(folderPath);

const counts = {
  "พรรคพิง": 0,
  "พรรคมาซบพี่": 0,
  "พรรคพักใจ": 0,
  "พรรคข้างกัน": 0,
  "พรรค(พัก)ข้างเธอ": 0,
  "ไม่ประสงค์ลงคะแนน": 0,
};

files.forEach((file) => {

  if (!file.endsWith(".csv")) return;

  const filePath = path.join(folderPath, file);

const csv = fs.readFileSync(filePath, "utf8");

const lines = csv.split("\n");

const headers = lines[0]
  .split(",")
  .map(h => h.trim());

const data = lines.slice(1).map(line => {

  const values = line.split(",");

  const row = {};

  headers.forEach((header, i) => {
    row[header] = values[i]?.trim();
  });

  return row;

});

  data.forEach((row) => {

   console.log(Object.keys(row));

const vote =
  row[Object.keys(row).find(key =>
    key.includes("ประธานนักเรียน")
  )];

if (!vote) return;

console.log(vote);

if (counts[vote] !== undefined) {
  counts[vote]++;
}

  });

});

async function updateVotes() {

  for (const party in counts) {

    await supabase
      .from("team")
      .update({
        score: counts[party]
      })
      .eq("name", party);

  }

  console.log("🔥 ALL FILES MERGED");

  console.log(counts);

}

updateVotes()
