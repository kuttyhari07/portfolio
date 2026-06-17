const About = require('../models/About');

const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({
        content: "I am Hari Haran, an enthusiastic IT student with a passion for full-stack web development. I love creating innovative solutions that make a difference. My journey in tech started with a curiosity about how websites work, and that curiosity has evolved into a full-blown passion for building amazing web applications.",
        careerObjective: "To secure a challenging position in a reputable organization where I can utilize my technical skills and contribute to the company's growth while continuously learning and evolving as a professional.",
        education: [
          {
            degree: "B.Tech in Information Technology",
            institution: "Anna University",
            year: "2021 - 2025",
            percentage: "8.9 CGPA"
          },
          {
            degree: "Higher Secondary Education",
            institution: "St. Mary's Higher Secondary School",
            year: "2019 - 2021",
            percentage: "92%"
          }
        ]
      });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAbout = async (req, res) => {
  try {
    const { content, careerObjective, education } = req.body;
    let about = await About.findOne();
    
    if (about) {
      about.content = content || about.content;
      about.careerObjective = careerObjective || about.careerObjective;
      about.education = education || about.education;
      about.updatedAt = Date.now();
      await about.save();
    } else {
      about = await About.create(req.body);
    }
    
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAbout, updateAbout };