import { useState, useEffect } from "react";
import { useToast } from "../hooks/useToast";
import "../styles/settings.css";

function Settings() {
  const toast = useToast();
  const [notifications, setNotifications] = useState({
    email: true,
    analysis: true,
    tips: false,
  });

  const [theme, setTheme] = useState(() => {
  return localStorage.getItem("theme") || "light";
});
  useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);

  localStorage.setItem("theme", theme);
}, [theme]);

  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    saveHistory: true,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePrivacy = (key) => {
    setPrivacy((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

    const handleSave = () => {
    if (passwords.new || passwords.confirm) {
      if (!passwords.current) {
        return toast.error("Please enter your current password.");
      }
      if (passwords.new.length < 8) {
        return toast.error("New password must be at least 8 characters.");
      }
      if (passwords.new !== passwords.confirm) {
        return toast.error("New passwords do not match.");
      }
    }

    setPasswords({ current: "", new: "", confirm: "" });
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account preferences and privacy.</p>
      </div>

      {/* Notifications */}
      <section className="settings-card">
        <div className="settings-card-header">
          <h2>Notifications</h2>
          <p>Choose which notifications you want to receive.</p>
        </div>

        <div className="setting-row">
          <div>
            <h3>Email Notifications</h3>
            <p>Receive updates through your email.</p>
          </div>

          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => handleNotification("email")}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-row">
          <div>
            <h3>Analysis Updates</h3>
            <p>Get notified about resume analysis results.</p>
          </div>

          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.analysis}
              onChange={() => handleNotification("analysis")}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-row">
          <div>
            <h3>Career Tips</h3>
            <p>Receive career advice and resume improvement tips.</p>
          </div>

          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.tips}
              onChange={() => handleNotification("tips")}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </section>

      {/* Appearance */}
      <section className="settings-card">
        <div className="settings-card-header">
          <h2>Appearance</h2>
          <p>Customize how the application looks.</p>
        </div>

        <div className="setting-row">
          <div>
            <h3>Theme Preference</h3>
            <p>Choose your preferred interface theme.</p>
          </div>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="settings-select"
          >
            <option value="light">☀️ Light Mode</option>
            <option value="dark">🌙 Dark Mode</option>
          </select>
        </div>
      </section>

      {/* Privacy */}
      <section className="settings-card">
        <div className="settings-card-header">
          <h2>Privacy</h2>
          <p>Manage your data and privacy preferences.</p>
        </div>

        <div className="setting-row">
          <div>
            <h3>Profile Visibility</h3>
            <p>Allow your profile information to be visible.</p>
          </div>

          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={privacy.profileVisibility}
              onChange={() => handlePrivacy("profileVisibility")}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-row">
          <div>
            <h3>Save Analysis History</h3>
            <p>Keep your previous resume analysis records.</p>
          </div>

          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={privacy.saveHistory}
              onChange={() => handlePrivacy("saveHistory")}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </section>

      {/* Password */}
      <section className="settings-card">
        <div className="settings-card-header">
          <h2>Change Password</h2>
          <p>Update your account password.</p>
        </div>

        <div className="password-form">
          <div className="password-field">
            <label>Current Password</label>
            <input
              type="password"
              name="current"
              placeholder="Enter current password"
              value={passwords.current}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="password-field">
            <label>New Password</label>
            <input
              type="password"
              name="new"
              placeholder="Enter new password"
              value={passwords.new}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="password-field">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirm"
              placeholder="Confirm new password"
              value={passwords.confirm}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
      </section>

      <div className="settings-footer">
        <button className="save-settings-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Settings;