const asyncHandler = (requestHandler)=> (req, res, next) => {
    return Promise.resolve(requestHandler(req, res, next)).catch(next);
}

export {asyncHandler}









// this one is also a way to do the same thing but with try catch approach

// const asyncHandler = (requestHandler)=> {

//     return async (req, res, next) => {
//         try{
//             await requestHandler(req, res, next);
//         }catch(error){
//             // next(error);
//             res.status(error.code || 500).json({
//                 success: false,
//                 message: error.message
//             })
//         }
//     }   
    
// }