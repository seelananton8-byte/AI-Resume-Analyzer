import { useState } from "react";
import { useToast } from "../hooks/useToast";
import "../styles/profile.css";

function Profile() {
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "Anton Sureshkumar",
    email: "anto@example.com",
    phone: "",
    location: "Tamil Nadu, India",
    jobTitle: "Full Stack Developer",
    experience: "0-1 Years",
    education: "B.Sc Chemistry",
    skills: "React, JavaScript, HTML, CSS, Node.js, Express, MongoDB",
    bio: "Aspiring software developer passionate about building modern web applications and learning new technologies.",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

    const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <div>
          <span className="profile-breadcrumb">
            Dashboard / My Profile
          </span>

          <h1>My Profile</h1>

          <p>Manage your personal information and career details.</p>
        </div>

        {!isEditing && (
          <button
            className="profile-edit-button"
            onClick={() => setIsEditing(true)}
          >
            ✎ Edit Profile
          </button>
        )}
      </div>

      {/* Profile Summary */}
      <div className="profile-summary-card">
        <div className="profile-avatar">A</div>

        <div className="profile-summary-info">
          <h2>{profile.fullName}</h2>
          <p>{profile.jobTitle}</p>
          <span className="profile-location">
            📍 {profile.location}
          </span>
        </div>

        <div className="profile-completion">
          <span>Profile Completion</span>
          <strong>85%</strong>

          <div className="completion-progress">
            <div style={{ width: "85%" }}></div>
          </div>

          <small>Complete your profile to get better insights</small>
        </div>
      </div>

      {/* Form */}
      <div className="profile-details-card">
        <div className="profile-section-heading">
          <div>
            <h2>Personal Information</h2>
            <p>Update your personal and professional details.</p>
          </div>
        </div>

        <div className="profile-form-grid">
          {/* Name */}
          <div className="profile-field">
            <label>Full Name</label>
            <input
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Email */}
          <div className="profile-field">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Phone */}
          <div className="profile-field">
            <label>Phone Number</label>
            <input
              name="phone"
              placeholder="Enter phone number"
              value={profile.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Location */}
          <div className="profile-field">
            <label>Location</label>
            <input
              name="location"
              value={profile.location}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Job */}
          <div className="profile-field">
            <label>Target Job Role</label>
            <input
              name="jobTitle"
              value={profile.jobTitle}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Experience */}
          <div className="profile-field">
            <label>Experience Level</label>
            <select
              name="experience"
              value={profile.experience}
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option>Fresher</option>
              <option>0–1 Years</option>
              <option>1–3 Years</option>
              <option>3–5 Years</option>
              <option>5+ Years</option>
            </select>
          </div>

          {/* Education */}
          <div className="profile-field full-width">
            <label>Education</label>
            <input
              name="education"
              value={profile.education}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Skills */}
          <div className="profile-field full-width">
            <label>Skills</label>
            <textarea
              name="skills"
              rows="3"
              value={profile.skills}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter your skills"
            />
          </div>

          {/* Bio */}
          <div className="profile-field full-width">
            <label>About Me</label>
            <textarea
              name="bio"
              rows="4"
              value={profile.bio}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Tell us about yourself"
            />
          </div>
        </div>

        {/* Actions */}
        {isEditing && (
          <div className="profile-actions">
            <button
              className="profile-cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              className="profile-save-button"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;