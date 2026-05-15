import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import authService from "../../services/authService";
import "./SignupPage.css";

export default function SignupPage() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    specialization: "",
    experience: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Validate inputs
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.role) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      // Validate doctor-specific fields
      if (formData.role === "doctor") {
        if (!formData.specialization || !formData.experience) {
          setError("Please fill in specialization and experience for doctor registration");
          setLoading(false);
          return;
        }
        if (isNaN(formData.experience) || formData.experience < 0) {
          setError("Experience must be a valid number");
          setLoading(false);
          return;
        }
      }

      // Validate password length
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long");
        setLoading(false);
        return;
      }

      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }

      // Call register API
      const response = await authService.registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        specialization: formData.role === "doctor" ? formData.specialization : null,
        experience: formData.role === "doctor" ? formData.experience : null
      });

      if (response.success) {
        setSuccess("Registration successful! Redirecting to login...");
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "user",
          specialization: "",
          experience: ""
        });
        
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">

      <div className="signup-wrapper">

        {/* LEFT FORM */}
        <div className="signup-card">

          <h2>Join Sakhi</h2>
          <p className="subtitle">Your Companion in Women's Health</p>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" onClick={() => setError("")}></button>
            </div>
          )}

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              {success}
              <button type="button" className="btn-close" onClick={() => setSuccess("")}></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <label>Register As</label>
            <div className="role-selector">
              <div className="radio-group">
                <input 
                  type="radio" 
                  id="user-role"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                />
                <label htmlFor="user-role">User</label>
              </div>
              <div className="radio-group">
                <input 
                  type="radio" 
                  id="doctor-role"
                  name="role"
                  value="doctor"
                  checked={formData.role === "doctor"}
                  onChange={handleChange}
                />
                <label htmlFor="doctor-role">Doctor</label>
              </div>
            </div>

            <label>Full Name</label>
            <div className="input-field">
              <User size={18}/>
              <input 
                type="text" 
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <label>Email Address</label>
            <div className="input-field">
              <Mail size={18}/>
              <input 
                type="email" 
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <label>Password</label>
            <div className="input-field">
              <Lock size={18}/>
              <input
                type={showPassword ? "text":"password"}
                name="password"
                placeholder="Create a password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                required
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
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span onClick={()=>setShowConfirm(!showConfirm)}>
                {showConfirm ? <EyeOff size={18}/> : <Eye size={18}/>}
              </span>
            </div>

            {/* CONDITIONAL DOCTOR FIELDS */}
            {formData.role === "doctor" && (
              <>
                <label>Specialization</label>
                <div className="input-field">
                  <User size={18}/>
                  <input 
                    type="text" 
                    name="specialization"
                    placeholder="e.g., Gynecology, Endocrinology"
                    value={formData.specialization}
                    onChange={handleChange}
                  />
                </div>

                <label>Years of Experience</label>
                <div className="input-field">
                  <User size={18}/>
                  <input 
                    type="number" 
                    name="experience"
                    placeholder="Enter years of experience"
                    value={formData.experience}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
              </>
            )}

            <div className="checkbox">
              <input type="checkbox" required/>
              <p>
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </p>
            </div>

            <button 
              className="signup-btn" 
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
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