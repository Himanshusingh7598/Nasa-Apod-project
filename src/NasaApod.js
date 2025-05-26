import React, { useEffect, useState } from 'react';

const NasaApod = () => {
  const today = new Date().toISOString().split('T')[0];
  // API se aane wala data store karega 
  const [apodData, setApodData] = useState(null);
  // input date ke liye
  const [selectedDate, setSelectedDate] = useState(today);
  // loading state karega
  const [loading, setLoading] = useState(false);
  // API key generated from NASA website.
  const apiKey = '5ytj3pnaTIo1E4IVzwFoS1XjhuQR0bu0HELr2iRp';

  const fetchApod = async (date = '') => {
    setLoading(true);
    try {
      const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}${date ? `&date=${date}` : ''}`;
      const response = await fetch(url);
      const data = await response.json();
      setApodData(data);
    } catch (error) {
      console.error('Error fetching APOD:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApod(today);
  }, []);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    fetchApod(date);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>NASA Astronomy Picture of the Day</h1>

        <div style={styles.datePickerWrapper}>
          <label htmlFor="datePicker" style={styles.label}>
            <span role="img" aria-label="calendar" style={styles.icon}></span>
            Select a Date:
          </label>
          <input
            id="datePicker"
            type="date"
            max={today}
            value={selectedDate}
            onChange={handleDateChange}
            style={styles.datePicker}
            onMouseOver={(e) => e.currentTarget.style.border = '2px solid #45a29e'}
            onMouseOut={(e) => e.currentTarget.style.border = '2px solid #66fcf1'}
            onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(102, 252, 241, 0.6)'}
            onBlur={(e) => e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 252, 241, 0.3)'}
          />
        </div>

        {selectedDate && (
          <p style={styles.dateDisplay}>
            Viewing APOD for: {new Date(selectedDate).toDateString()}
          </p>
        )}
      </header>

      <main>
        {loading ? (
          <p style={styles.loading}>Fetching the stars for you...</p>
        ) : apodData ? (
          <>
            {apodData.media_type === 'image' ? (
              <img src={apodData.url} alt="NASA APOD" style={styles.image} />
            ) : (
              <iframe
                src={apodData.url}
                title="NASA APOD Video"
                style={styles.video}
                frameBorder="0"
                allow="fullscreen"
              />
            )}
            <h2 style={styles.apodTitle}>{apodData.title}</h2>
            <p style={styles.apodDate}>Date: {apodData.date}</p>
            <p style={styles.apodExplanation}>{apodData.explanation}</p>
          </>
        ) : (
          <p>No data available.</p>
        )}
      </main>

      <footer style={styles.footer}>
        <p>Data provided by NASA's APOD API | Created by Himanshu Singh</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#0d0d0d',
    color: '#f0f0f0',
    textAlign: 'center',
    minHeight: '100vh',
    paddingBottom: 40,
  },
  header: {
    background: 'radial-gradient(circle at top left, #66fcf1, #0b0c10)',
    padding: '30px 20px',
    marginBottom: 30,
    boxShadow: '0 8px 25px rgba(102, 252, 241, 0.3)',
    borderBottom: '2px solid #45a29e',
  },
  title: {
    fontSize: '2.8em',
    margin: 0,
    color: '#ffffff',
    fontWeight: 'bold',
    textShadow: '1px 1px 8px #0b0c10',
  },
  datePickerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  label: {
    fontSize: '1.1rem',
    color: '#66fcf1',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 5,
  },
  icon: {
    fontSize: '1.5rem',
  },
  datePicker: {
    padding: '12px 18px',
    fontSize: '1rem',
    borderRadius: 15,
    border: '2px solid #66fcf1',
    outline: 'none',
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 4px 15px rgba(102, 252, 241, 0.3)',
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',
    appearance: 'none',
    textAlign: 'center',
  },
  dateDisplay: {
    marginTop: 10,
    fontSize: '1.1em',
    color: '#c5c6c7',
    fontStyle: 'italic',
  },
  loading: {
    fontSize: '1.2em',
    marginTop: 40,
    color: '#66fcf1',
  },
  image: {
    maxWidth: '90%',
    maxHeight: 500,
    borderRadius: 15,
    marginTop: 20,
    boxShadow: '0 0 25px rgba(102, 252, 241, 0.4)',
  },
  video: {
    width: '90%',
    maxWidth: 800,
    height: 450,
    marginTop: 20,
    borderRadius: 15,
    boxShadow: '0 0 25px rgba(102, 252, 241, 0.4)',
  },
  apodTitle: {
    fontSize: '2em',
    marginTop: 20,
    color: '#66fcf1',
  },
  apodDate: {
    fontSize: '1.1em',
    margin: '5px 0 20px',
    fontStyle: 'italic',
    color: '#c5c6c7',
  },
  apodExplanation: {
    fontSize: '1.1em',
    maxWidth: 900,
    margin: '0 auto',
    padding: '0 20px',
    textAlign: 'justify',
    lineHeight: 1.7,
  },
  footer: {
    marginTop: 40,
    padding: '15px 0',
    backgroundColor: '#1f2833',
    color: '#c5c6c7',
    fontSize: '0.9em',
  },
};

export default NasaApod;