import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import { FaUserEdit, FaSignOutAlt, FaEnvelope, FaShieldAlt, FaSave, FaTimes } from "react-icons/fa";
import API_URL from "../config/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  // Re-trigger AOS animations when switching between view/edit modes
  useEffect(() => {
    AOS.refresh();
  }, [edit]);

  // Get User Profile
  const token = localStorage.getItem("token");
  const fetchProfile = useCallback(
    async () => {
      try {
        const res = await fetch(`${API_URL}/auth/register`, {
          method: "GET",
          headers: {
            authorization: token,
          },
        });

        const data = await res.json();
        setUser(data);
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    (async () => {
      await fetchProfile();
    })();
  }, [fetchProfile]);

  //Put Update User Profile
  const updateProfile = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/auth/register`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ name, email }),
    });

    const data = await res.json();
    //instant ui update
    toast.success("Profile Updated ✓");
    setUser(data.user);
    setEdit(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logout successfully");
    window.location.href = "/login";
  };

  // Loading state
  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-bg-deco">
          <span className="profile-deco-circle profile-deco-1"></span>
          <span className="profile-deco-circle profile-deco-2"></span>
          <span className="profile-deco-circle profile-deco-3"></span>
        </div>
        <div className="page-loading">
          <div className="page-loading-spinner"></div>
          <h4>Loading profile...</h4>
          <p>Fetching your account details</p>
        </div>
      </div>
    );
  }

  // Not logged in state
  if (!token) {
    return (
      <div className="profile-no-auth">
        <div className="profile-no-auth-card" data-aos="zoom-in">
          <div className="no-auth-icon">🔐</div>
          <h2>Please login to view Profile</h2>
          <p>You need to be logged in to access your account settings</p>
          <button className="profile-gold-btn" onClick={() => navigate("/login")}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="profile-page">
        {/* Decorative background elements */}
        <div className="profile-bg-deco">
          <span className="profile-deco-circle profile-deco-1"></span>
          <span className="profile-deco-circle profile-deco-2"></span>
          <span className="profile-deco-circle profile-deco-3"></span>
        </div>

        <div className="profile-wrapper" data-aos="fade-up">
          {/* Header */}
          <div className="profile-header">
            <div className="profile-header-line"></div>
            <h1>My Profile</h1>
            <p className="profile-header-sub">Manage your account settings</p>
          </div>

          {edit ? (
            /* ── Edit Mode ── */
            <div className="profile-card profile-edit-card" data-aos="fade-up">
              <div className="profile-edit-badge">
                <FaUserEdit /> Editing
              </div>

              <div className="profile-field">
                <label className="profile-label">
                  <span className="profile-label-text">Name</span>
                  <input
                    className="profile-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </label>
              </div>

              <div className="profile-field">
                <label className="profile-label">
                  <span className="profile-label-text">Email</span>
                  <input
                    className="profile-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </label>
              </div>

              <div className="profile-btn-group">
                <button
                  className="profile-btn profile-btn-primary"
                  onClick={updateProfile}
                >
                  <FaSave /> Save
                </button>
                <button
                  className="profile-btn profile-btn-cancel"
                  onClick={() => setEdit(false)}
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          ) : (
            /* ── View Mode ── */
            <div className="profile-card" data-aos="zoom-in">
              {user ? (
                <>
                  <div className="avatar-section">
                    <div className="avatar-ring">
                      <div className="avatar-circle">
                        {user.name?.[0]?.toUpperCase() || "U"}
                      </div>
                    </div>
                    <div className="avatar-glow"></div>
                  </div>

                  <h2 className="profile-name">{user.name}</h2>

                  <div className="profile-info-list">
                    <div className="profile-info-item">
                      <FaEnvelope className="profile-info-icon" />
                      <div>
                        <span className="profile-info-label">Email</span>
                        <span className="profile-info-value">{user.email}</span>
                      </div>
                    </div>
                    <div className="profile-info-item">
                      <FaShieldAlt className="profile-info-icon" />
                      <div>
                        <span className="profile-info-label">Role</span>
                        <span className="profile-info-value profile-role-badge">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="profile-divider"></div>

                  <div className="profile-btn-group">
                    <button
                      className="profile-btn profile-btn-primary"
                      onClick={() => setEdit(true)}
                    >
                      <FaUserEdit /> Edit Profile
                    </button>
                    <button
                      className="profile-btn profile-btn-logout"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="profile-loading">
                  <div className="profile-loading-spinner"></div>
                  <p>Loading profile...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
