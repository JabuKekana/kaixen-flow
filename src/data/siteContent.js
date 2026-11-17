import boschendalLogo from '../assets/boschendal.png';
import communityGroupImage from '../assets/community-group.jpeg';
import cultureLabLogo from '../assets/culture-lab.jpg';
import founderImage from '../assets/founder-pilates.jpg';
import heroImage from '../assets/hero-pilates-Cj07xAMG.jpeg';
import loccitaneLogo from '../assets/loccitane.png';
import pilatesBrunchImage from '../assets/pilates-brunch-july.jpeg';
import boschendalBottleImage from '../assets/real-boschendal-bottles.jpg';
import instructorImage from '../assets/real-instructor.jpg';
import matLineImage from '../assets/real-mat-line.jpg';
import mineralAxisImage from '../assets/real-mineral-axis.jpg';
import mothersDayImage from '../assets/real-mothers-day.jpg';
import parkClassImage from '../assets/real-park-class.jpg';
import parkSquatsImage from '../assets/real-park-squats.jpg';
import parkStretchImage from '../assets/real-park-stretch.jpg';
import parkWalkImage from '../assets/real-park-walk.jpg';
import pinkSquatImage from '../assets/real-pink-squat.jpg';
import venueBarImage from '../assets/real-venue-bar.jpg';
import venueInteriorImage from '../assets/real-venue-interior.jpg';
import welcomeSignImage from '../assets/real-welcome-sign.jpg';
import trufflesLogo from '../assets/truffles.png';
import bootcampImage from '../assets/bootcampimage.jpg';
import birthdayImage from '../assets/birthday-image.jpeg';
import { FiActivity, FiMusic, FiStar, FiUsers } from 'react-icons/fi';

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'The Club', href: '/about' },
  { label: 'The Scrapbook', href: '/gallery' },
  { label: 'Events', href: '/events' },
];

export const footerLinks = [...navLinks, { label: 'Book a Class', href: '/book' }];

export const socialLinks = [
  { href: 'https://www.instagram.com/kaixenflow/', label: 'Instagram' },
  { href: 'https://www.tiktok.com/@kaixenflow_', label: 'TikTok' },
  {
    href: 'https://api.whatsapp.com/send/?phone=27679111801&text=Hi+I+would+like+to+book+a+KaixenFlow+Pilates+session&type=phone_number&app_absent=0&utm_source=ig',
    label: 'WhatsApp',
  },
];

export const homeOfferings = [
  'Curated Pilates and movement events',
  'Birthday wellness experiences',
  'Private one-on-one movement sessions',
  'Reset and rebirth wellness gatherings',
  'Small group luxury wellness moments',
];

export const homeFeatures = [
  {
    icon: FiMusic,
    title: 'Music-led Flow',
    text: 'Pilates-inspired movement shaped around rhythm, breath and grounded transitions.',
  },
  {
    icon: FiUsers,
    title: 'Community',
    text: 'Intentional gatherings designed to create ease, connection and shared momentum.',
  },
  {
    icon: FiActivity,
    title: 'Physio-informed',
    text: 'Movement choices built around strength, mobility and body-awareness.',
  },
  {
    icon: FiStar,
    title: 'Luxury Experience',
    text: 'Soft styling, thoughtful venues and sensory details that elevate each event.',
  },
];

export const collaborations = [
  { name: 'Boschendal', image: boschendalLogo },
  { name: 'Truffles on the Park', image: trufflesLogo },
  { name: 'Culture Lab', image: cultureLabLogo },
  { name: "L'Occitane", image: loccitaneLogo },
];

export const aboutPillars = [
  {
    number: '01',
    title: 'Physio-informed movement',
    text: 'Anatomy, rehab principles and functional strength shape the flow.',
  },
  {
    number: '02',
    title: 'Music and rhythm',
    text: 'Curated sound creates energy, softness and structure across each session.',
  },
  {
    number: '03',
    title: 'Community experience',
    text: 'Events are designed to feel intimate, welcoming and connected.',
  },
  {
    number: '04',
    title: 'Intentional living',
    text: 'Small, consistent steps sit at the core of the KaixenFlow story.',
  },
];

export const galleryItems = [
  { title: 'You, Me & Pilates', image: welcomeSignImage, height: 'tall' },
  { title: 'Movement in the Park', image: parkClassImage, height: 'large' },
  { title: 'Led with Intention', image: instructorImage, height: 'large' },
  { title: 'Sunlit Flow', image: parkStretchImage, height: 'medium' },
  { title: 'The Community Mat', image: matLineImage, height: 'tall' },
  { title: 'Strength & Softness', image: pinkSquatImage, height: 'medium' },
  { title: 'Together in Motion', image: parkSquatsImage, height: 'large' },
  { title: 'Arrivals', image: parkWalkImage, height: 'medium' },
  { title: 'Truffles On The Park', image: venueInteriorImage, height: 'large' },
  { title: 'Post-Flow Bar', image: venueBarImage, height: 'medium' },
  { title: 'Boschendal Brut', image: boschendalBottleImage, height: 'tall' },
  { title: 'Scent & Ritual', image: mineralAxisImage, height: 'large' },
  { title: "Mother's Day Edition", image: mothersDayImage, height: 'large' },
];

const archivedEvents = [
  {
    date: 'Sat · 04 July 2026',
    image: pilatesBrunchImage,
    price: 'R370',
    priceAmount: 370,
    time: '10:00 a.m.',
    title: 'Pilates & Brunch',
    venue: 'Truffles on the Park, Sandton, Johannesburg',
  },
  {
    description:
      "A premium Women's Month gathering that blends movement, intention, music and soft community moments in a refined Sandton setting.",
    date: 'Sun · 09 August 2026',
    image: communityGroupImage,
    price: 'R550',
    priceAmount: 550,
    time: '09:00 a.m.',
    title: "Women's Day Pilates",
    venue: 'The Artistry Sandton',
  },
];

const scheduledEvents = [
  {
    description:
      'A 4-week summer reset for body and mind. Move. Mind. Glow. Join us for intentional movement, strength building, and mindset shifts designed to sculpt, energise and transform.',
    date: 'Starts Sat · 12 September 2026',
    endsAt: '2026-10-03T23:59:59+02:00',
    image: bootcampImage,
    price: 'R850 Full Series / R200 Drop In',
    priceAmount: 850,
    time: '09:00 a.m.',
    title: '4 Week Bootcamp',
    venue: 'Pilates in the Park',
    hasDropIn: true,
    dropInPrice: 200,
  },
  {
    description:
      'Celebrating growth, community and every girl who showed up for herself. A day of Pilates, wellness, brunch and connection in a beautiful setting.',
    date: 'Sat · 03 October 2026',
    endsAt: '2026-10-03T23:59:59+02:00',
    image: birthdayImage,
    price: 'R695',
    priceAmount: 695,
    time: '09:00 a.m.',
    title: "KaixenFlow's Birthday",
    venue: 'Venue TBA',
  },
];

export const upcomingEvents = scheduledEvents.filter((event) => new Date(event.endsAt).getTime() >= Date.now());
export const pastEvents = [...scheduledEvents.filter((event) => new Date(event.endsAt).getTime() < Date.now()), ...archivedEvents];
export const events = [...scheduledEvents, ...archivedEvents];
export const bookingOptions = upcomingEvents.map((event) => event.title);
export const featuredHomeEvent = upcomingEvents[0];

export const homeImages = {
  about: founderImage,
  cta: communityGroupImage,
  hero: heroImage,
};
