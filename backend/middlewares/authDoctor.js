import jwt from 'jsonwebtoken'

// admin authentication middleware
const authDoctor = async (req,res,next) => {
    try {
        const dtoken = req.headers["dtoken"] || req.headers["Dtoken"] || req.headers["authorization"];
        console.log('res: ', req.headers)
        console.log('dtoken',dtoken)
        if(!dtoken) {
            return res. json({success:false,message: 'Not Authorized Login Again' })
        }
        const token_decode = jwt. verify(dtoken, process.env.JWT_SECRET)
        // console.log("token decode:", token_decode)
        req.body.docId = token_decode.id
        next()
    }
    catch (error) {
        console. log(error)
        res. json({success: false,message:error.message})
    }
}
export default authDoctor