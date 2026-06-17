const Home = require('../models/Home');

const getHome = async (req, res) => {
  try {
    let home = await Home.findOne();
    if (!home) {
      home = await Home.create({
        name: 'Hari Haran',
        title: 'IT Student & Full Stack Developer',
        introText: 'Passionate about building innovative solutions...',
        typingTexts: ['MERN Stack Developer', 'Problem Solver', 'Tech Enthusiast'],
      });
    }
    res.json(home);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHome = async (req, res) => {
  try {
    const { name, title, introText, typingTexts, profilePhoto, resumeUrl } = req.body;
    let home = await Home.findOne();
    
    if (home) {
      home.name = name || home.name;
      home.title = title || home.title;
      home.introText = introText || home.introText;
      home.typingTexts = typingTexts || home.typingTexts;
      home.profilePhoto = profilePhoto || home.profilePhoto;
      home.resumeUrl = resumeUrl || home.resumeUrl;
      home.updatedAt = Date.now();
      await home.save();
    } else {
      home = await Home.create(req.body);
    }
    
    res.json(home);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHome, updateHome };