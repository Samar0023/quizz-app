

export const isAdmin = (req, res, next) => {
  try {
    
    if(!req.user){
          return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    } 

    if(req.user.role !== "admin"){
                 return res.status(403).json({
      success: false,
      message: "user access denied",
    });
    }  
    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Admin check failed",
    });
  }
};
