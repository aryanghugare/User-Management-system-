const User = require('../models/User');

const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || '';
    const searchQuery = search
      ? {
          $or: [
            { email: { $regex: search, $options: 'i' } },
            { fullName: { $regex: search, $options: 'i' } }
          ]
        }
      : {};

    const total = await User.countDocuments(searchQuery);

    const users = await User.find(searchQuery)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalUsers: total,
          hasNextPage: page < Math.ceil(total / limit),
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

const activateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot modify your own account status.'
      });
    }

    if (user.status === 'active') {
      return res.status(400).json({
        success: false,
        message: 'User is already active.'
      });
    }

    user.status = 'active';
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: 'User activated successfully.',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

const deactivateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot modify your own account status.'
      });
    }

    if (user.status === 'inactive') {
      return res.status(400).json({
        success: false,
        message: 'User is already inactive.'
      });
    }

    user.status = 'inactive';
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: 'User deactivated successfully.',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot modify your own role.'
      });
    }

    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be either admin or user.'
      });
    }

    user.role = role;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: `User role updated to ${role} successfully.`,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  activateUser,
  deactivateUser,
  updateUserRole
};
