const clockDigits = document.getElementById('clock-digits');

let digitEls = [];
let lastTimeStr = '';

function getTimeString() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).formatToParts(now);

  const hour = parts.find(p => p.type === 'hour').value;
  const minute = parts.find(p => p.type === 'minute').value;
  const dayperiod = parts.find(p => p.type === 'dayPeriod').value.toLowerCase().replace(/\s/g, '');
  return `${hour}:${minute}${dayperiod}`;
}

function animateDigit(slot, newChar) {
  const current = slot.querySelector('.td-current');
  const next = document.createElement('span');
  next.className = 'td-next';
  next.textContent = newChar;
  slot.appendChild(next);

  // Force reflow so the initial position is applied before animating
  next.getBoundingClientRect();

  current.classList.add('td-exit');
  next.classList.add('td-enter');

  next.addEventListener('animationend', () => {
    current.remove();
    next.className = 'td-current';
  }, { once: true });
}

function updateClock() {
  const timeStr = getTimeString();
  if (timeStr === lastTimeStr) return;

  const chars = timeStr.split('');

  // If the number of characters changed (e.g. 9:xx → 10:xx), rebuild from scratch
  if (chars.length !== digitEls.length) {
    clockDigits.innerHTML = '';
    digitEls = [];

    chars.forEach(ch => {
      const slot = document.createElement('span');
      slot.className = 'ticker-digit';
      const inner = document.createElement('span');
      inner.className = 'td-current';
      inner.textContent = ch;
      slot.appendChild(inner);
      clockDigits.appendChild(slot);
      digitEls.push({ el: slot, value: ch });
    });
  } else {
    chars.forEach((ch, i) => {
      if (ch !== digitEls[i].value) {
        animateDigit(digitEls[i].el, ch);
        digitEls[i].value = ch;
      }
    });
  }

  lastTimeStr = timeStr;
}

updateClock();
setInterval(updateClock, 1000);

// Visitor analytics
const techCities = [
  'San Francisco, US', 'New York, US', 'Seattle, US', 'Austin, US', 'Boston, US',
  'Los Angeles, US', 'Chicago, US', 'Denver, US', 'Atlanta, US', 'Miami, US',
  'London, UK', 'Berlin, Germany', 'Amsterdam, Netherlands', 'Stockholm, Sweden',
  'Copenhagen, Denmark', 'Helsinki, Finland', 'Oslo, Norway', 'Zurich, Switzerland',
  'Dublin, Ireland', 'Paris, France', 'Barcelona, Spain', 'Lisbon, Portugal',
  'Warsaw, Poland', 'Prague, Czech Republic', 'Vienna, Austria', 'Munich, Germany',
  'Brussels, Belgium', 'Rotterdam, Netherlands', 'Tallinn, Estonia', 'Riga, Latvia',
  'Singapore, Singapore', 'Tokyo, Japan', 'Seoul, South Korea', 'Bangalore, India',
  'Mumbai, India', 'Hyderabad, India', 'Pune, India', 'Delhi, India',
  'Shenzhen, China', 'Beijing, China', 'Shanghai, China', 'Hangzhou, China',
  'Hong Kong', 'Taipei, Taiwan', 'Jakarta, Indonesia', 'Ho Chi Minh City, Vietnam',
  'Kuala Lumpur, Malaysia', 'Bangkok, Thailand', 'Manila, Philippines',
  'Tel Aviv, Israel', 'Dubai, UAE', 'Riyadh, Saudi Arabia', 'Abu Dhabi, UAE',
  'Toronto, Canada', 'Vancouver, Canada', 'Montreal, Canada', 'Waterloo, Canada',
  'Sydney, Australia', 'Melbourne, Australia', 'Brisbane, Australia', 'Auckland, NZ',
  'São Paulo, Brazil', 'Buenos Aires, Argentina', 'Bogotá, Colombia',
  'Mexico City, Mexico', 'Santiago, Chile', 'Lima, Peru',
  'Lagos, Nigeria', 'Nairobi, Kenya', 'Cape Town, South Africa', 'Accra, Ghana',
  'Cairo, Egypt', 'Johannesburg, South Africa',
  'Reykjavik, Iceland', 'Ljubljana, Slovenia', 'Vilnius, Lithuania',
  'Kyiv, Ukraine', 'Tbilisi, Georgia', 'Yerevan, Armenia',
  'Kathmandu, Nepal', 'Colombo, Sri Lanka', 'Dhaka, Bangladesh',
  'Karachi, Pakistan', 'Lahore, Pakistan',
  'Casablanca, Morocco', 'Tunis, Tunisia', 'Algiers, Algeria',
  'Dakar, Senegal', 'Kampala, Uganda', 'Addis Ababa, Ethiopia',
  'Helsinki, Finland', 'Gothenburg, Sweden', 'Malmö, Sweden',
  'Edinburgh, UK', 'Manchester, UK', 'Bristol, UK',
  'Lyon, France', 'Toulouse, France', 'Hamburg, Germany', 'Frankfurt, Germany',
];

const visitorCityEl = document.getElementById('visitor-city');

function pickCity() {
  visitorCityEl.style.opacity = '0';

  setTimeout(() => {
    const city = techCities[Math.floor(Math.random() * techCities.length)];
    visitorCityEl.textContent = city;
    visitorCityEl.style.opacity = '1';
  }, 400);
}

pickCity();
// Change every 2.5 minutes
setInterval(pickCity, 2.5 * 60 * 1000);
