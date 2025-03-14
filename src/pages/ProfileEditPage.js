// src/pages/ProfileEditPage.js
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../contexts/ProfileContext';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileEditPage.module.css'; // Create this CSS file

function ProfileEditPage() {
  const { currentUser } = useAuth();
  const { profile, updateProfile, loading: profileLoading } = useProfile();
  const [name, setName] = useState(profile?.name || ''); // Initialize with existing profile data
  const [educationLevel, setEducationLevel] = useState(profile?.educationLevel || '');
  const [isStudent, setIsStudent] = useState(profile?.isStudent || null);
  const [school, setSchool] = useState(profile?.school || '');
  const [province, setProvince] = useState(profile?.province || '');
  const [city, setCity] = useState(profile?.city || '');
  const [university, setUniversity] = useState(profile?.university || '');
  const [fieldOfStudy, setFieldOfStudy] = useState(profile?.fieldOfStudy || '');
  const [faculty, setFaculty] = useState(profile?.faculty || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state for form submission

  const navigate = useNavigate();

  // --- (کدهای مربوط به لود کردن استان‌ها، شهرها، و دانشگاه‌ها - دقیقاً مثل LoginPage.js) ---
    // Load provinces on component mount:
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch('/data/iran_cities.json'); // Assuming iran_cities.json is in public/data
                const data = await response.json();
                setProvinces(data.provinces);
            } catch (error) {
                console.error("Error loading provinces:", error);
                setError('Failed to load provinces.'); // Set an error message
            }
        };

        fetchProvinces();
    }, []);

      // Update cities when province changes:
    useEffect(() => {
        const fetchCities = async () => {
            if (!province) {
                setCities([]); // Clear cities if no province is selected
                return;
            }

            try {
                const response = await fetch('/data/iran_cities.json');
                const data = await response.json();
                // Find the selected province
                const selectedProvince = data.provinces.find(p => p.name === province);
                if (!selectedProvince) {
                    setCities([]);
                    return;
                }

                // Filter cities based on the selected province
                const filteredCities = data.Cities.filter(c => c.province === province);

                setCities(filteredCities);
                setCity(''); // Reset city selection when province changes
                setUniversities([]); // Also clear universities
                setUniversity('');

            } catch (error) {
                console.error("Error loading cities:", error);
                setError('Failed to load cities.');
            }
        };

        fetchCities();
    }, [province]); // Run this effect whenever 'province' changes

    // Update universities when city changes:
    useEffect(() => {
        const fetchUniversities = async () => {
            if (!city) {
                setUniversities([]);
                return;
            }

            try {
                const response = await fetch('/data/iran_universities.json');
                const data = await response.json();

                const filteredUnis = data.universities.filter(u => u.city === city)
                setUniversities(filteredUnis);
                setUniversity('');

            } catch (error) {
                console.error("Error loading universities", error);
                setError('Failed to load universities')
            }
        };
        fetchUniversities();
    }, [city])

    const filteredCities = useMemo(() => {
        if (!province) {
            return [];
        }
        return cities.filter(c => c.province === province);
    }, [cities, province]);

    const filteredUniversities = useMemo(() => {
        if (!city) {
            return [];
        }
        return universities.filter((u) => u.city === city);
    }, [universities, city]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const profileData = {
        uid: currentUser.uid, // Use currentUser.uid
        name,
        educationLevel,
        isStudent,
        ...(isStudent === 'yes' && educationLevel === 'school' && { school }),
        ...(isStudent === 'yes' && educationLevel === 'university' && { university, province, city, fieldOfStudy, faculty }),
      };
      await updateProfile(profileData);
      navigate('/welcome'); // Redirect to welcome page after successful update
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (profileLoading || loading) {
    return <div>Loading...</div>; // Show loading indicator while updating profile
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <FormattedMessage id="profileEdit.title" />
      </h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* ... (فیلدهای فرم - دقیقاً مثل LoginPage.js، اما با مقادیر اولیه از profile) ... */}
        <div className={styles.inputGroup}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="educationLevel">Education Level:</label>
                      <select
                          id="educationLevel"
                          value={educationLevel}
                          onChange={(e) => setEducationLevel(e.target.value)}
                          required
                          className={styles.input}
                        >
                          <option value="">Select...</option>
                          <option value="school">School</option>
                          <option value="university">University</option>
                          <option value="other">Other</option>
                      </select>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Are you a student?</label>
                    <div>
                      <label>
                        <input
                          type="radio"
                          value="yes"
                          checked={isStudent === 'yes'}
                          onChange={() => setIsStudent('yes')}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="no"
                          checked={isStudent === 'no'}
                          onChange={() => setIsStudent('no')}
                        />
                        No
                      </label>
                    </div>
                  </div>
                    {isStudent === 'yes' && educationLevel === 'school' && (
                        <div className={styles.inputGroup}>
                        <label htmlFor="school">School Name:</label>
                        <input
                            type="text"
                            id="school"
                            value={school}
                            onChange={(e) => setSchool(e.target.value)}
                            className={styles.input}
                        />
                        </div>
                    )}

                  {isStudent === 'yes' && educationLevel === 'university' && (
                    <>
                    <div className={styles.inputGroup}>
                        <label htmlFor="province">Province:</label>
                        <select
                            id="province"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            required
                            className={styles.input}
                        >
                            <option value="">Select a province</option>
                            {provinces.map((p) => (
                                <option key={p.name} value={p.name}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="city">City:</label>
                        <select
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            className={styles.input}
                            disabled={!province} // Disable if no province is selected
                        >
                            <option value="">Select a city</option>
                            {filteredCities.map((c) => (
                                <option key={c.name} value={c.name}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="university">University:</label>
                      <select
                        id="university"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        required
                        className={styles.input}
                        disabled={!city} // Disable if no city is selected.
                      >
                        <option value="">Select a university</option>
                        {filteredUniversities.map((u) => (
                          <option key={u.name} value={u.name}>
                            {u.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="faculty">Faculty:</label>
                        <input
                        type="text"
                        id="faculty"
                        value={faculty}
                        onChange={(e) => setFaculty(e.target.value)}
                        className={styles.input}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="fieldOfStudy">Field of Study:</label>
                      <input
                        type="text"
                        id="fieldOfStudy"
                        value={fieldOfStudy}
                        onChange={(e) => setFieldOfStudy(e.target.value)}
                        className={styles.input}
                      />
                      </div>
                    </>

                )}

        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>
          <FormattedMessage id="profileEdit.save" />
        </button>
      </form>
    </div>
  );
}

export default ProfileEditPage;