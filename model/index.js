const { query } = require("../db");

//Get all videos
async function getAllVideos() {
  const result = await query(`SELECT * FROM videos ;`);
  return result.rows;
}

//Add video
async function addVideo(
  title,
  lecturer,
  video_url,
  thumbnail_url,
  tags,
  timestamps,
  lecture_date,
  bootcamp_week,
  description,
  github_links,
  slides,
  other_links
) {
  const result = await query(
    `INSERT INTO videos (title,
      lecturer,
      video_url,
      thumbnail_url,
      tags,
      timestamps,
      lecture_date,
      bootcamp_week,
      description,
      github_links,
      slides,
      other_links) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;`,
    [
      title,
      lecturer,
      video_url,
      thumbnail_url,
      tags,
      timestamps,
      lecture_date,
      bootcamp_week,
      description,
      github_links,
      slides,
      other_links,
    ]
  );
  return result.rows;
}

//Delete video
async function deleteVideo(id) {
  const result = await query(`DELETE FROM videos WHERE id = ($1);`, [id]);
  return result.rows;
}

//Update video
async function updateVideo(
  title,
  lecturer,
  video_url,
  thumbnail_url,
  tags,
  timestamps,
  lecture_date,
  bootcamp_week,
  description,
  github_links,
  slides,
  other_links,
  id
) {
  const result = await query(
    `UPDATE videos SET
  title = COALESCE($1, title),
  lecturer = COALESCE($2, lecturer),
  video_url = COALESCE($3, video_url),
  thumbnail_url = COALESCE($4, thumbnail_url),
  tags = COALESCE($5, tags),
  timestamps = COALESCE($6, timestamps),
  lecture_date = COALESCE($7, lecture_date),
  bootcamp_week = COALESCE($8, bootcamp_week),
  description = COALESCE($9, description),
  github_links = COALESCE($10, github_links),
  slides = COALESCE($11, slides),
  other_links = COALESCE($12, other_links) 
  WHERE id = ($13) 
  RETURNING id;`,
    [
      title,
      lecturer,
      video_url,
      thumbnail_url,
      tags,
      timestamps,
      lecture_date,
      bootcamp_week,
      description,
      github_links,
      slides,
      other_links,
      id,
    ]
  );
  return result.rows[0].id;
}

module.exports = {
  getAllVideos,
  addVideo,
  deleteVideo,
  updateVideo,
};