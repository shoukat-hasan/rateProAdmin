import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"

const VerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const code = searchParams.get("code") // <- fixed name here
  const email = searchParams.get("email")
  const navigate = useNavigate()

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/verify-email", { code, email }) // <- send correct keys
        Swal.fire("✅ Verified!", res.data.message, "success")
        navigate("/login")
      } catch (error) {
        Swal.fire("❌ Verification Failed", error.response?.data?.message || "Something went wrong", "error")
      }
    }

    if (code && email) {
      verify()
    }
  }, [code, email, navigate])

  return (
    <div className="text-center mt-5">
      <h2>Verifying your email...</h2>
    </div>
  )
}

export default VerifyEmail