const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../utils/authMiddleware');

// Get all projects
router.get('/', projectController.getAllProjects);
// Get project by ID
router.get('/:id', projectController.getProjectById);
// Create new project (protected)
router.post('/', authMiddleware, projectController.createProject);
// Update project (protected)
router.put('/:id', authMiddleware, projectController.updateProject);
// Delete project (protected)
router.delete('/:id', authMiddleware, projectController.deleteProject);

module.exports = router; 