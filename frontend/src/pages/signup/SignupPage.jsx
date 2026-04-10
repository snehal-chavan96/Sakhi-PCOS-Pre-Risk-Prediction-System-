import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import "./SignupPage.css";

export default function SignupPage() {

  const [showPassword,setShowPassword]=useState(false)
  const [showConfirm,setShowConfirm]=useState(false)

  return (
    <div className="signup-page">

      <div className="signup-wrapper">

        {/* LEFT FORM */}
        <div className="signup-card">

          <h2>Join Sakhi</h2>
          <p className="subtitle">Your Companion in Women's Health</p>

          <form>

            <label>Full Name</label>
            <div className="input-field">
              <User size={18}/>
              <input type="text" placeholder="Enter your full name"/>
            </div>

            <label>Email Address</label>
            <div className="input-field">
              <Mail size={18}/>
              <input type="email" placeholder="your.email@example.com"/>
            </div>

            <label>Password</label>
            <div className="input-field">
              <Lock size={18}/>
              <input
              type={showPassword ? "text":"password"}
              placeholder="Create a password"
              />
              <span onClick={()=>setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </span>
            </div>

            <label>Confirm Password</label>
            <div className="input-field">
              <Lock size={18}/>
              <input
              type={showConfirm ? "text":"password"}
              placeholder="Confirm your password"
              />
              <span onClick={()=>setShowConfirm(!showConfirm)}>
                {showConfirm ? <EyeOff size={18}/> : <Eye size={18}/>}
              </span>
            </div>

            <div className="checkbox">
              <input type="checkbox"/>
              <p>
                I agree to the <a>Terms of Service</a> and <a>Privacy Policy</a>
              </p>
            </div>

            <button className="signup-btn">
              Create Account
            </button>

            <p className="login-text">
              Already have an account? <Link to="/login">Login</Link>
            </p>

          </form>

        </div>

        {/* RIGHT SIDE */}

        <div className="signup-right">

          <img
          src="https://images.unsplash.com/photo-1676629650907-d50f2f27db20"
          alt="women support"
          />

          <h3>Why Join Sakhi?</h3>

          <div className="benefit">
            <div className="icon"></div>
            <div>
              <b>Personalized Health Insights</b>
              <p>Get tailored recommendations based on your unique health profile</p>
            </div>
          </div>

          <div className="benefit">
            <div className="icon"></div>
            <div>
              <b>Early Risk Detection</b>
              <p>Access our AI-powered PCOS prediction tool for early awareness</p>
            </div>
          </div>

          <div className="benefit">
            <div className="icon"></div>
            <div>
              <b>Supportive Community</b>
              <p>Connect with others on similar health journeys</p>
            </div>
          </div>

          <div className="benefit">
            <div className="icon"></div>
            <div>
              <b>Privacy First</b>
              <p>Your health data is encrypted and always secure</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}