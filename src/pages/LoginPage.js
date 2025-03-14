// src/pages/LoginPage.js
import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../contexts/ProfileContext';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import styles from './LoginPage.module.css';

function LoginPage() {
    const { login, signup } = useAuth();
    const { updateProfile } = useProfile();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [educationLevel, setEducationLevel] = useState('');
    const [isStudent, setIsStudent] = useState(null);
    const [school, setSchool] = useState('');
    // University related states:
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    // const [country, setCountry] = useState(''); // Removed unused state
    const [university, setUniversity] = useState('');
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const [faculty, setFaculty] = useState('');

    // --- Country and University ---
    // const [countries, setCountries] = useState([]); // Removed unused state and fetch
    const [universities, setUniversities] = useState([]);
    // Data states:
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    // const [universities, setUniversities] = useState([]); // Moved inside useMemo

    const navigate = useNavigate();

    // Load provinces on component mount:
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

    // Memoize the filtered cities:
    const filteredCities = useMemo(() => {
        if (!province) {
            return [];
        }
        return cities.filter(c => c.province === province);
    }, [cities, province]); // Only re-filter if cities or province changes

    // Memoize the filtered universities:
    const filteredUniversities = useMemo(() => {
        if (!city) {
            return [];
        }
        return universities.filter((u) => u.city === city);
    }, [universities, city]); // Only re-filter if universities or city changes

    // ** Fetch Universities when city changes (using iran_universities.json) **
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

    // --- Country and University ---  (Removed unused external API calls)

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



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
                navigate('/');
            } else {
                const userCredential = await signup(email, password);
                const profileData = {
                    uid: userCredential.user.uid,
                    name,
                    educationLevel,
                    isStudent,
                    ...(isStudent === 'yes' && educationLevel === 'school' && { school }),
                    ...(isStudent === 'yes' && educationLevel === 'university' && { university: university, province, city, fieldOfStudy, faculty }), // Save the selected university *object*, not just the name
                };
                await updateProfile(profileData);
                navigate('/welcome');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                <FormattedMessage id={isLogin ? 'loginPage.title' : 'loginPage.signup'} />
            </h2>

            {!isLogin && (
                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* ... other input fields (name, email, password) ... */}
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
                 <div className={styles.inputGroup}>
                        <label htmlFor="email"><FormattedMessage id="loginPage.email" />:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password"><FormattedMessage id="loginPage.password" />:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.button}>
                    <FormattedMessage id="loginPage.signup" />
                    </button>

                </form>
            )}

            {isLogin && (
                <form onSubmit={handleSubmit} className={styles.form}>
                   <div className={styles.inputGroup}>
                        <label htmlFor="email"><FormattedMessage id="loginPage.email" />:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password"><FormattedMessage id="loginPage.password" />:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.button}>
                        <FormattedMessage id="loginPage.login" />
                    </button>
                </form>
            )}

            <button onClick={toggleMode} className={styles.toggleButton}>
                {isLogin ? (
                    <FormattedMessage id="loginPage.signup" />
                ) : (
                    <FormattedMessage id="loginPage.login" />
                )}
            </button>
        </div>
    );
}

export default LoginPage;