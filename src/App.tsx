/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowUpRight, Check, MapPin, Phone, X } from 'lucide-react';

import HERO_IMAGE from './assets/images/hero_plumbing_craft_1790886742678.jpg';
import SERVICE_PLUMBING_IMG from './assets/images/service_plumbing_detail_1790886753819.jpg';
import SERVICE_ELECTRICAL_IMG from './assets/images/service_electrical_detail_1790886764920.jpg';
import SERVICE_URGENT_IMG from './assets/images/service_urgent_valve_1790886775632.jpg';
import SF_HOMES_IMG from './assets/images/sf_home_pipework_1790886787321.jpg';
import CRAFT_WORKSITE_IMG from './assets/images/craft_clean_worksite_1790887653820.jpg';
import CRAFT_ELECTRICAL_IMG from './assets/images/craft_electrical_panel_detail_1790887666142.jpg';
import SF_NEIGHBORHOOD_IMG from './assets/images/sf_powell_neighborhood_homes_1790887678603.jpg';

const PHONE_DISPLAY = '(415) 908-1466';
const PHONE_HREF = 'tel:+14159081466';
const DIRECTIONS_URL =
  'https://www.google.com/maps/search/?api=1&query=2019+Powell+St,+San+Francisco,+CA+94133';

/**
 * Cubic-bezier(0.22, 1, 0.36, 1) approximation for smooth programmatic scroll
 */
function easeWebflow(t: number): number {
  return 1 - Math.pow(1 - t, 3.4);
}

/**
 * Dual-layer vertical rolling text/icon wrapper for buttons
 */
function RollingButtonContent({ children }: { children: React.ReactNode }) {
  return (
    <span className="btn-roll-wrap">
      <span className="btn-roll-primary">{children}</span>
      <span aria-hidden="true" className="btn-roll-clone">
        {children}
      </span>
    </span>
  );
}

/**
 * Resilient image component following the Zero-Broken-Image Policy
 */
interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
  fallbackLabel: string;
}

function EditorialImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  style,
  fallbackLabel,
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      style={{
        backgroundImage: !hasError ? `url("${src}")` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className={`relative overflow-hidden bg-[#F5F5F5] ${className}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="eager"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          style={style}
          className={`w-full h-full object-cover block ${imgClassName}`}
        />
      ) : (
        <div className="w-full h-full flex flex-col justify-between p-6 bg-[#F5F5F5] border border-[#E0E0E0] text-[#080808]">
          <div className="w-6 h-[1px] bg-[#080808]/30" />
          <span className="text-xs tracking-wide text-[#080808]/60 font-medium">
            {fallbackLabel}
          </span>
        </div>
      )}
    </div>
  );
}

interface ReviewItem {
  id: string;
  name: string;
  neighborhood: string;
  propertyType: string;
  category: 'Plumbing' | 'Electrical' | 'Urgent Service';
  quote: string;
  outcome: string;
}

const CLIENT_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Marcus Vance',
    neighborhood: 'North Beach',
    propertyType: '1920s 3-Unit Flat',
    category: 'Urgent Service',
    quote:
      'A corroded shut-off valve beneath our second-floor kitchen began leaking into the ceiling below on a weekday morning. Klein Brothers walked over from Powell Street, isolated the line immediately, and brazed a new quarter-turn brass valve cleanly.',
    outcome: 'Main line shut-off replaced in 90 minutes',
  },
  {
    id: 'rev-2',
    name: 'Elena Rostova',
    neighborhood: 'Russian Hill',
    propertyType: 'Edwardian Condominium',
    category: 'Plumbing',
    quote:
      'Our cast-iron kitchen stack was backing up between two units with very tight cabinet clearance. They diagnosed the exact bend where buildup sat, cleared the line without damaging the historic plaster, and left the floor spotless.',
    outcome: 'Shared drain stack cleared & tested',
  },
  {
    id: 'rev-3',
    name: 'David & Claire Chen',
    neighborhood: 'Pacific Heights',
    propertyType: 'Single-Family Residence',
    category: 'Electrical',
    quote:
      'Half of our dining and hallway lighting started flickering intermittently. Instead of guessing, they traced the fault to a loose neutral inside an older junction box in the basement, repaired the connection properly, and labeled the circuit.',
    outcome: 'Intermittent circuit fault traced & resolved',
  },
  {
    id: 'rev-4',
    name: 'Julian Thorne',
    neighborhood: 'Marina District',
    propertyType: '1930s Barrel-Front Home',
    category: 'Plumbing',
    quote:
      'We needed three bathroom fixtures and corroded angle stops replaced before moving in. They put down heavy canvas runners across all the hardwood, aligned every chrome trap straight, and tested water pressure at every tap.',
    outcome: 'Full fixture & valve installation',
  },
  {
    id: 'rev-5',
    name: 'Hannah Lindqvist',
    neighborhood: 'Noe Valley',
    propertyType: 'Victorian Rowhouse',
    category: 'Electrical',
    quote:
      'Our kitchen outlets kept tripping whenever two appliances ran at once. Klein Brothers explained the load issue in plain English, repaired the damaged receptacle wiring, and verified every outlet along the wall under full load.',
    outcome: 'Kitchen branch circuit troubleshooting',
  },
  {
    id: 'rev-6',
    name: 'Robert Castellano',
    neighborhood: 'Telegraph Hill',
    propertyType: 'Hillside Apartment Building',
    category: 'Urgent Service',
    quote:
      'When a hot water supply line pinhole leak started spraying inside our utility closet, they answered on the second ring. Calm, methodical work—replaced the failing copper section and checked the pressure regulator so it would not happen again.',
    outcome: 'Emergency copper supply repair',
  },
  {
    id: 'rev-7',
    name: 'Sophia Patel',
    neighborhood: 'Hayes Valley',
    propertyType: 'Renovated Edwardian Flat',
    category: 'Plumbing',
    quote:
      'A persistent slow drain and noisy toilet fill valve had bothered us for months. They showed me the worn internal assembly before replacing anything, completed both fixes in one visit, and charged exactly what was discussed.',
    outcome: 'Fixture rebuild & trap replacement',
  },
  {
    id: 'rev-8',
    name: 'Thomas Sterling',
    neighborhood: 'Lower Pacific Heights',
    propertyType: 'Classic Townhouse',
    category: 'Electrical',
    quote:
      'We had several dead wall switches and ungrounded fixtures in our upstairs study. They worked quietly, explained what was behind the lath-and-plaster walls, and restored every switch and fixture without leaving a speck of dust.',
    outcome: 'Switch & lighting circuit restoration',
  },
  {
    id: 'rev-9',
    name: 'Mei-Ling Zhou',
    neighborhood: 'Inner Sunset',
    propertyType: '1940s Sunset Home',
    category: 'Plumbing',
    quote:
      'Old galvanized pipes in our laundry area were restricting flow to a trickle. They transitioned the accessible run to clean copper with new brass shut-offs. Water flow is strong again and the pipework looks like architectural metalwork.',
    outcome: 'Galvanized-to-copper supply transition',
  },
  {
    id: 'rev-10',
    name: 'Arthur Pendelton',
    neighborhood: 'Nob Hill',
    propertyType: 'Pre-War Co-op Residence',
    category: 'Urgent Service',
    quote:
      'Building rules here are strict about noise and common areas. Klein Brothers arrived on time, coordinated with our building manager on the water shut-down window, and finished the valve replacement ahead of schedule.',
    outcome: 'Co-op main riser valve repair',
  },
];

const SF_ZONES = [
  {
    index: '01',
    area: 'North Beach & Russian Hill',
    distance: 'Minutes from 2019 Powell St',
    headline: 'Multi-unit flats & shared stacks.',
    detail:
      'Tight lightwells, shared main shut-off valves, and stacked wet walls where one leak affects the flat below. We coordinate shut-downs cleanly and work neatly in shared corridors.',
    tags: ['Stacked drains', 'Isolation valves', 'Multi-unit troubleshooting'],
  },
  {
    index: '02',
    area: 'Pacific Heights & Marina',
    distance: 'Northern Neighborhoods',
    headline: 'Architectural fixtures & quiet electrical work.',
    detail:
      'Finished basements, concealed supply piping, and older junction boxes behind plaster walls. We protect finished floors and diagnose faults without unnecessary wall openings.',
    tags: ['Precision fixtures', 'Circuit diagnostics', 'Pressure regulation'],
  },
  {
    index: '03',
    area: 'Noe Valley, Castro & Sunset',
    distance: 'Citywide Dispatch',
    headline: 'Victorian & mid-century utility transitions.',
    detail:
      'Bridging original cast-iron or galvanized runs with modern copper and brass, and resolving overloaded residential branch circuits with clear explanations.',
    tags: ['Pipe transitions', 'Switch & outlet repairs', 'Urgent shut-offs'],
  },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Scroll-linked motion states
  const [heroParallaxY, setHeroParallaxY] = useState(0);
  const [sfParallaxY, setSfParallaxY] = useState(0);
  const [serviceHorizontalX, setServiceHorizontalX] = useState(0);
  const [sfActiveStep, setSfActiveStep] = useState(1);

  // New Section 1 (Craftsmanship) scroll states
  const [craftPrimaryParallax, setCraftPrimaryParallax] = useState(0);
  const [craftSecondaryParallax, setCraftSecondaryParallax] = useState(0);
  const [craftVisible, setCraftVisible] = useState(false);

  // New Section 2 (SF Neighborhood Dispatch) scroll states
  const [dispatchScale, setDispatchScale] = useState(0.95);
  const [dispatchPanX, setDispatchPanX] = useState(0);
  const [dispatchVisible, setDispatchVisible] = useState(false);
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);

  // Reviews Section states
  const [reviewsVisible, setReviewsVisible] = useState(false);
  const [reviewScrollShift, setReviewScrollShift] = useState(0);
  const [reviewFilter, setReviewFilter] = useState<
    'All' | 'Plumbing' | 'Electrical' | 'Urgent Service'
  >('All');

  // Existing Section reveal states
  const [servicesHeaderVisible, setServicesHeaderVisible] = useState(false);
  const [servicesGridVisible, setServicesGridVisible] = useState(false);
  const [trustVisible, setTrustVisible] = useState(false);
  const [sfMobileVisible, setSfMobileVisible] = useState(false);
  const [processHeaderVisible, setProcessHeaderVisible] = useState(false);
  const [processStepsVisible, setProcessStepsVisible] = useState(false);
  const [finalCtaVisible, setFinalCtaVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  // Interactive Service Request Drawer state (in Final CTA)
  const [serviceDrawerOpen, setServiceDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    'Plumbing' | 'Electrical' | 'Urgent Service'
  >('Plumbing');
  const [requesterName, setRequesterName] = useState('');
  const [requesterPhone, setRequesterPhone] = useState('');
  const [requesterDetails, setRequesterDetails] = useState('');
  const [formError, setFormError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Refs
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const servicesSectionRef = useRef<HTMLElement | null>(null);
  const servicesHeaderRef = useRef<HTMLDivElement | null>(null);
  const servicesGridRef = useRef<HTMLDivElement | null>(null);
  const trustSectionRef = useRef<HTMLElement | null>(null);
  const craftSectionRef = useRef<HTMLElement | null>(null);
  const sfPinnedRef = useRef<HTMLElement | null>(null);
  const sfImageRef = useRef<HTMLDivElement | null>(null);
  const dispatchSectionRef = useRef<HTMLElement | null>(null);
  const dispatchImageRef = useRef<HTMLDivElement | null>(null);
  const reviewsSectionRef = useRef<HTMLElement | null>(null);
  const processHeaderRef = useRef<HTMLDivElement | null>(null);
  const processStepsRef = useRef<HTMLDivElement | null>(null);
  const finalCtaRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);

  // Detect reduced motion and viewport width
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    const updateViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    updateViewport();
    window.addEventListener('resize', updateViewport, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  // Dynamic canonical & og:url resolution for SEO
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const canonicalUrl = window.location.origin + window.location.pathname;

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    let ogUrlMeta = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrlMeta) {
      ogUrlMeta = document.createElement('meta');
      ogUrlMeta.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrlMeta);
    }
    ogUrlMeta.setAttribute('content', canonicalUrl);
  }, []);

  // Lock body scroll & handle Escape when mobile slide-in drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Smooth scrolling navigation with cubic-bezier(0.22, 1, 0.36, 1)
  const scrollToTarget = (
    targetId: string,
    openServiceForm?: 'Plumbing' | 'Electrical' | 'Urgent Service'
  ) => {
    setMobileMenuOpen(false);

    if (openServiceForm) {
      setSelectedCategory(openServiceForm);
      setServiceDrawerOpen(true);
      setFormSubmitted(false);
    }

    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    const navOffset = 68;
    const rect = targetEl.getBoundingClientRect();
    const startY = window.scrollY;
    const targetY = Math.max(0, startY + rect.top - navOffset);

    if (prefersReducedMotion) {
      window.scrollTo(0, targetY);
      return;
    }

    const duration = window.innerWidth < 1024 ? 550 : 720;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeWebflow(progress);
      window.scrollTo(0, startY + (targetY - startY) * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  // Scroll listener for Navigation state, Parallax, Horizontal Service glide, Pinned SF section, Craftsmanship, Dispatch, and Reviews
  useEffect(() => {
    let ticking = false;

    const updateOnScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // 1. Navigation scroll state (> 40px)
      setIsScrolled(scrollY > 40);

      if (prefersReducedMotion) {
        setHeroParallaxY(0);
        setSfParallaxY(0);
        setServiceHorizontalX(0);
        setSfActiveStep(3);
        setCraftPrimaryParallax(0);
        setCraftSecondaryParallax(0);
        setDispatchScale(1);
        setDispatchPanX(0);
        setReviewScrollShift(0);
        ticking = false;
        return;
      }

      const desktopMode = window.innerWidth >= 1024;

      // 2. Hero Image Parallax (-5% to +5%)
      if (desktopMode && heroImageRef.current) {
        const rect = heroImageRef.current.getBoundingClientRect();
        const centerOffset = (rect.top + rect.height / 2 - vh / 2) / vh;
        const clamped = Math.max(-1, Math.min(1, centerOffset));
        setHeroParallaxY(clamped * -5);
      } else {
        setHeroParallaxY(0);
      }

      // 3. Services Horizontal Scroll Effect (Desktop only: right -> left -16vw travel centered at mid-viewport)
      if (desktopMode && servicesSectionRef.current) {
        const rect = servicesSectionRef.current.getBoundingClientRect();
        const totalTravel = vh + rect.height;
        const currentPassed = vh - rect.top;
        const rawProgress = Math.max(0, Math.min(1, currentPassed / totalTravel));
        const shiftVw = (0.5 - rawProgress) * 16;
        setServiceHorizontalX(shiftVw);
      } else {
        setServiceHorizontalX(0);
      }

      // 4. New Section 1: Craftsmanship Dual-Image Opposite Parallax
      if (desktopMode && craftSectionRef.current) {
        const rect = craftSectionRef.current.getBoundingClientRect();
        const centerOffset = (rect.top + rect.height / 2 - vh / 2) / vh;
        const clamped = Math.max(-1, Math.min(1, centerOffset));
        setCraftPrimaryParallax(clamped * -5);
        setCraftSecondaryParallax(clamped * 7);
      } else {
        setCraftPrimaryParallax(0);
        setCraftSecondaryParallax(0);
      }

      // 5. Pinned San Francisco Section progress & parallax
      if (sfPinnedRef.current) {
        const rect = sfPinnedRef.current.getBoundingClientRect();
        if (desktopMode) {
          const scrollableDistance = Math.max(1, rect.height - vh);
          const scrolledInside = -rect.top;
          const progress = Math.max(0, Math.min(1, scrolledInside / scrollableDistance));

          if (progress < 0.28) {
            setSfActiveStep(1);
          } else if (progress < 0.64) {
            setSfActiveStep(2);
          } else {
            setSfActiveStep(3);
          }
        } else {
          setSfActiveStep(3);
        }
      }

      if (desktopMode && sfImageRef.current) {
        const rect = sfImageRef.current.getBoundingClientRect();
        const centerOffset = (rect.top + rect.height / 2 - vh / 2) / vh;
        const clamped = Math.max(-1, Math.min(1, centerOffset));
        setSfParallaxY(clamped * -5);
      } else {
        setSfParallaxY(0);
      }

      // 6. New Section 2: San Francisco Neighborhood Dispatch progressive scale & pan
      if (dispatchImageRef.current) {
        const rect = dispatchImageRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
        const scaleVal = desktopMode ? 0.95 + Math.min(1, progress * 1.4) * 0.05 : 1;
        const panVal = desktopMode ? (0.5 - progress) * 6 : 0;
        setDispatchScale(scaleVal);
        setDispatchPanX(panVal);
      }

      // 7. Reviews Section scroll-linked horizontal shift
      if (reviewsSectionRef.current) {
        const rect = reviewsSectionRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
        setReviewScrollShift((0.5 - progress) * 70);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    };

    updateOnScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [prefersReducedMotion]);

  // IntersectionObserver for scroll reveals (80-85% viewport height, Final CTA at 70%)
  useEffect(() => {
    if (prefersReducedMotion) {
      setServicesHeaderVisible(true);
      setServicesGridVisible(true);
      setTrustVisible(true);
      setCraftVisible(true);
      setSfMobileVisible(true);
      setDispatchVisible(true);
      setReviewsVisible(true);
      setProcessHeaderVisible(true);
      setProcessStepsVisible(true);
      setFinalCtaVisible(true);
      setFooterVisible(true);
      return;
    }

    const standardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target;
          if (target === servicesHeaderRef.current) setServicesHeaderVisible(true);
          if (target === servicesGridRef.current) setServicesGridVisible(true);
          if (target === trustSectionRef.current) setTrustVisible(true);
          if (target === craftSectionRef.current) setCraftVisible(true);
          if (target === sfPinnedRef.current) setSfMobileVisible(true);
          if (target === dispatchSectionRef.current) setDispatchVisible(true);
          if (target === reviewsSectionRef.current) setReviewsVisible(true);
          if (target === processHeaderRef.current) setProcessHeaderVisible(true);
          if (target === processStepsRef.current) setProcessStepsVisible(true);
          if (target === footerRef.current) setFooterVisible(true);
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -15% 0px',
        threshold: 0.08,
      }
    );

    const finalCtaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFinalCtaVisible(true);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -28% 0px',
        threshold: 0.1,
      }
    );

    if (servicesHeaderRef.current) standardObserver.observe(servicesHeaderRef.current);
    if (servicesGridRef.current) standardObserver.observe(servicesGridRef.current);
    if (trustSectionRef.current) standardObserver.observe(trustSectionRef.current);
    if (craftSectionRef.current) standardObserver.observe(craftSectionRef.current);
    if (sfPinnedRef.current) standardObserver.observe(sfPinnedRef.current);
    if (dispatchSectionRef.current) standardObserver.observe(dispatchSectionRef.current);
    if (reviewsSectionRef.current) standardObserver.observe(reviewsSectionRef.current);
    if (processHeaderRef.current) standardObserver.observe(processHeaderRef.current);
    if (processStepsRef.current) standardObserver.observe(processStepsRef.current);
    if (footerRef.current) standardObserver.observe(footerRef.current);
    if (finalCtaRef.current) finalCtaObserver.observe(finalCtaRef.current);

    return () => {
      standardObserver.disconnect();
      finalCtaObserver.disconnect();
    };
  }, [prefersReducedMotion]);

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = requesterName.trim();
    const trimmedPhone = requesterPhone.trim();
    const digitsOnly = trimmedPhone.replace(/\D/g, '');

    if (!trimmedName) {
      setFormError('Please enter your name.');
      return;
    }
    if (digitsOnly.length < 7) {
      setFormError('Please enter a valid phone number so we can call you back.');
      return;
    }

    setFormError('');
    setFormSubmitted(true);
  };

  const services = [
    {
      id: 'plumbing',
      index: '01',
      title: 'Plumbing',
      copy: 'Drains. Toilets. Fixtures. Pipes.',
      image: SERVICE_PLUMBING_IMG,
      alt: 'Precision chrome plumbing fixture and exposed pipework in a clean residential space',
      delay: 0,
    },
    {
      id: 'electrical',
      index: '02',
      title: 'Electrical',
      copy: 'Repairs. Installations. Troubleshooting.',
      image: SERVICE_ELECTRICAL_IMG,
      alt: 'Professional electrical testing and brushed steel conduit installation',
      delay: 80,
    },
    {
      id: 'urgent',
      index: '03',
      title: 'Urgent Service',
      copy: "When the problem can't wait.",
      image: SERVICE_URGENT_IMG,
      alt: 'Heavy-duty steel wrench beside a brass main water shut-off valve',
      delay: 160,
    },
  ] as const;

  const processSteps = [
    {
      number: '01',
      title: 'Call',
      description: "Tell us what's happening.",
      delay: 0,
    },
    {
      number: '02',
      title: 'Diagnose',
      description: 'We find the issue and explain it.',
      delay: 90,
    },
    {
      number: '03',
      title: 'Fix',
      description: 'The work gets done cleanly and efficiently.',
      delay: 180,
    },
  ];

  const mobileNavLinks = [
    { index: '01', label: 'Plumbing', target: 'plumbing' },
    { index: '02', label: 'Electrical', target: 'electrical' },
    { index: '03', label: 'The Standard', target: 'craftsmanship' },
    { index: '04', label: 'San Francisco', target: 'neighborhoods' },
    { index: '05', label: 'Reviews', target: 'reviews' },
    { index: '06', label: 'Contact', target: 'contact' },
  ];

  const rowOneReviews = CLIENT_REVIEWS.slice(0, 5);
  const rowTwoReviews = CLIENT_REVIEWS.slice(5, 10);
  const filteredReviews =
    reviewFilter === 'All'
      ? CLIENT_REVIEWS
      : CLIENT_REVIEWS.filter((r) => r.category === reviewFilter);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#080808] selection:bg-[#146EF5] selection:text-[#FFFFFF]">
      {/* TOP BAR NAVIGATION (Strict 3-Zone Contract + Compact Mobile Arrangement) */}
      <header
        style={{
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(255, 255, 255, 0)',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(10px)' : 'none',
          transition:
            'background-color 250ms cubic-bezier(0.22, 1, 0.36, 1), border-color 250ms cubic-bezier(0.22, 1, 0.36, 1), padding 250ms cubic-bezier(0.22, 1, 0.36, 1), transform 250ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        className={`fixed top-0 left-0 right-0 z-40 border-b animate-nav-load ${
          isScrolled ? 'border-[#E0E0E0] py-3 sm:py-3.5' : 'border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-3">
          {/* Zone 1: Single Text Element Brand Wordmark (Sized cleanly for mobile & desktop) */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget('top');
            }}
            className={`text-[16px] sm:text-[18px] lg:text-[19px] font-semibold tracking-[-0.025em] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#146EF5] ${
              isScrolled ? 'text-[#080808]' : 'text-white'
            }`}
          >
            Klein Brothers
          </a>

          {/* Zone 2: Clean Typography Navigation Links (Desktop >= 1024px only; Mobile & Tablet use slide-in drawer) */}
          <nav
            aria-label="Primary Navigation"
            className={`hidden lg:flex items-center gap-8 lg:gap-9 text-[14px] font-medium ${
              isScrolled ? 'text-[#080808]/75' : 'text-white/85'
            }`}
          >
            <a
              href="#plumbing"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget('plumbing');
              }}
              className="relative py-1 hover:text-current transition-colors duration-200 whitespace-nowrap after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-current after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200"
            >
              Plumbing
            </a>
            <a
              href="#electrical"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget('electrical');
              }}
              className="relative py-1 hover:text-current transition-colors duration-200 whitespace-nowrap after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-current after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200"
            >
              Electrical
            </a>
            <a
              href="#reviews"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget('reviews');
              }}
              className="relative py-1 hover:text-current transition-colors duration-200 whitespace-nowrap after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-current after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200"
            >
              Reviews
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget('contact');
              }}
              className="relative py-1 hover:text-current transition-colors duration-200 whitespace-nowrap after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-current after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Primary Action + Mobile/Tablet Slide-In Drawer Trigger */}
          <div className="flex items-center gap-2">
            {/* Compact "Call" label on mobile & tablet (< 1024px) so navbar stays balanced; full number on desktop (lg+) */}
            <a
              href={PHONE_HREF}
              aria-label="Call Klein Brothers"
              className="btn-primary-wf inline-flex items-center justify-center px-3.5 lg:px-5 py-2 lg:py-2.5 text-[13px] lg:text-[14px] font-medium rounded-[6px] whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#146EF5]"
            >
              <RollingButtonContent>
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </RollingButtonContent>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-slide-drawer"
              aria-label="Open navigation drawer"
              className="lg:hidden inline-flex flex-col items-center justify-center gap-[5px] w-10 h-10 rounded-[6px] border border-[#080808] bg-[#080808] text-[#FFFFFF] active:bg-[#146EF5] active:border-[#146EF5] transition-colors cursor-pointer shrink-0"
            >
              <span className="w-4 h-[1.5px] bg-[#FFFFFF] block" />
              <span className="w-4 h-[1.5px] bg-[#FFFFFF] block" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE & TABLET SLIDE-IN DRAWER (Off-canvas right drawer with backdrop scrim) */}
      <div
        id="mobile-slide-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Drawer"
        className={`fixed inset-0 z-50 lg:hidden ${
          mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop Scrim */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            opacity: mobileMenuOpen ? 1 : 0,
            transition: 'opacity 380ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className="absolute inset-0 bg-[#080808]/30 backdrop-blur-[3px]"
        />

        {/* Slide-In Panel */}
        <aside
          style={{
            transform: mobileMenuOpen ? 'translate3d(0%, 0, 0)' : 'translate3d(100%, 0, 0)',
            transition: 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className="absolute top-0 right-0 bottom-0 w-[84vw] max-w-[360px] bg-[#FFFFFF] border-l border-[#E0E0E0] flex flex-col justify-between p-6 overflow-y-auto"
        >
          {/* Drawer Top Header */}
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-[#E0E0E0]">
              <span className="text-[16px] font-semibold tracking-[-0.025em] text-[#080808]">
                Klein Brothers
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation drawer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-[6px] border border-[#080808] bg-[#080808] text-[#FFFFFF] active:bg-[#146EF5] active:border-[#146EF5] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Staggered Drawer Navigation Links */}
            <nav aria-label="Mobile Navigation Links" className="mt-4 divide-y divide-[#E0E0E0]">
              {mobileNavLinks.map((item, idx) => (
                <a
                  key={item.target}
                  href={`#${item.target}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget(item.target);
                  }}
                  style={{
                    opacity: mobileMenuOpen ? 1 : 0,
                    transform: mobileMenuOpen ? 'translate3d(0, 0, 0)' : 'translate3d(18px, 0, 0)',
                    transition: `opacity 380ms cubic-bezier(0.22, 1, 0.36, 1) ${
                      60 + idx * 45
                    }ms, transform 380ms cubic-bezier(0.22, 1, 0.36, 1) ${60 + idx * 45}ms`,
                  }}
                  className="py-3.5 flex items-center justify-between group text-[#080808]"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-[12px] font-medium text-[#146EF5] tabular-nums">
                      {item.index}
                    </span>
                    <span className="text-[20px] font-semibold tracking-[-0.02em] group-hover:text-[#146EF5] transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#080808]/35 group-hover:text-[#146EF5] transition-colors" />
                </a>
              ))}
            </nav>
          </div>

          {/* Drawer Footer with Direct Phone & Service Actions */}
          <div
            style={{
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, 12px, 0)',
              transition:
                'opacity 420ms cubic-bezier(0.22, 1, 0.36, 1) 260ms, transform 420ms cubic-bezier(0.22, 1, 0.36, 1) 260ms',
            }}
            className="pt-6 border-t border-[#E0E0E0] space-y-4"
          >
            <div>
              <p className="text-[12px] font-medium text-[#080808]/50">San Francisco Dispatch</p>
              <p className="mt-0.5 text-[14px] text-[#080808]/80">
                2019 Powell St, San Francisco, CA 94133
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href={PHONE_HREF}
                className="btn-primary-wf w-full inline-flex items-center justify-center py-3.5 px-4 text-[14px] font-medium rounded-[6px] tabular-nums whitespace-nowrap"
              >
                <RollingButtonContent>
                  <Phone className="w-4 h-4" />
                  <span>Call (415) 908-1466</span>
                </RollingButtonContent>
              </a>
              <button
                type="button"
                onClick={() => scrollToTarget('contact', 'Plumbing')}
                className="btn-secondary-wf w-full inline-flex items-center justify-center py-3 px-4 text-[14px] font-medium rounded-[6px] whitespace-nowrap cursor-pointer"
              >
                <RollingButtonContent>
                  <span>Get Service</span>
                </RollingButtonContent>
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* MAIN CONTENT */}
      <main id="top">
        {/* HERO SECTION */}
        <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden border-b border-[#E0E0E0] bg-[#111815] px-5 pt-28 pb-10 sm:px-8 sm:pt-32 lg:px-12">
          <div ref={heroImageRef} aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <img
              src={HERO_IMAGE}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
              style={{
                transform:
                  isDesktop && !prefersReducedMotion
                    ? `scale(1.08) translate3d(0, ${heroParallaxY}%, 0)`
                    : 'none',
                transition: 'transform 120ms linear',
              }}
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[#111815]/25"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#101512]/90 via-[#101512]/68 to-[#101512]/28"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101512]/50 via-transparent to-[#101512]/20"
          />

          <div className="relative z-10 mx-auto grid w-full max-w-[1360px] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
            <div className="max-w-[780px]">
              <p className="animate-hero-headline mb-5 flex items-center gap-3 text-[11px] font-semibold tracking-[0.13em] text-white/85 sm:mb-6 sm:text-[12px]">
                <MapPin aria-hidden="true" className="h-5 w-5 shrink-0 text-[#E9A27E]" />
                SAN FRANCISCO PLUMBING &amp; ELECTRICAL
              </p>

              <h1
                style={{ textWrap: 'balance' }}
                className="animate-hero-headline text-[48px] font-bold leading-[1.02] tracking-[-0.035em] text-white sm:text-[64px] lg:text-[76px] xl:text-[84px]"
              >
                Plumbing problems.
                <br />
                Clearly handled.
              </h1>

              <div className="mt-6 flex flex-wrap gap-2 sm:mt-7 sm:gap-2.5">
                {['Plumbing', 'Electrical', 'Urgent service', 'San Francisco'].map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-white/55 bg-white/[0.06] px-3 py-1.5 text-[12px] font-medium leading-none text-white/95 backdrop-blur-sm sm:text-[13px]"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <p className="animate-hero-support mt-5 max-w-[52ch] text-[16px] leading-[1.6] text-white/85 sm:mt-6 sm:text-[18px]">
                Responsive plumbing and electrical service in San Francisco.
              </p>

              <div className="animate-hero-cta mt-7 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
                <a
                  href={PHONE_HREF}
                  className="btn-primary-wf inline-flex min-h-12 items-center justify-center rounded-[6px] px-6 py-3.5 text-[15px] font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <RollingButtonContent>
                    <Phone className="h-4 w-4" />
                    <span>Call Now</span>
                  </RollingButtonContent>
                </a>
                <button
                  type="button"
                  onClick={() => scrollToTarget('contact', 'Plumbing')}
                  className="inline-flex min-h-12 items-center justify-center rounded-[6px] border border-white/70 bg-white/[0.06] px-6 py-3.5 text-[15px] font-medium whitespace-nowrap text-white backdrop-blur-sm transition-colors hover:bg-white/15 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <RollingButtonContent>
                    <span>Get Service</span>
                  </RollingButtonContent>
                </button>
              </div>

              <p className="mt-6 flex items-center gap-2 text-[13px] font-medium text-white/75 lg:hidden">
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-[#E9A27E]" />
                2019 Powell St, San Francisco, CA 94133
              </p>
            </div>

            <aside className="hidden items-center gap-4 justify-self-end self-end border border-white/25 bg-white/[0.12] px-5 py-4 text-white shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-md lg:flex lg:w-full">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#146EF5]">
                <MapPin aria-hidden="true" className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[11px] font-semibold tracking-[0.1em] text-white/70">
                  LOCAL DISPATCH
                </span>
                <span className="mt-1 block text-[15px] font-medium leading-snug">
                  2019 Powell St
                  <br />
                  San Francisco, CA 94133
                </span>
              </span>
            </aside>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section
          id="services"
          ref={servicesSectionRef}
          className="relative py-20 sm:py-28 lg:py-36 border-b border-[#E0E0E0] overflow-hidden"
        >
          {/* Visible Section Background Image + WCAG >= 4.5:1 Calibrated Scrim */}
          <div
            aria-hidden="true"
            style={{
              backgroundImage: `url("${SERVICE_PLUMBING_IMG}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="pointer-events-none absolute inset-0 opacity-[0.28]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FFFFFF]/96 via-[#FFFFFF]/86 to-[#FFFFFF]/72"
          />

          <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
            {/* Section Header */}
            <div
              ref={servicesHeaderRef}
              style={{
                opacity: servicesHeaderVisible ? 1 : 0,
                transform: servicesHeaderVisible ? 'translateY(0px)' : 'translateY(28px)',
                transition:
                  'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              className="max-w-[760px] mb-14 sm:mb-20"
            >
              <p className="text-[12px] sm:text-[13px] font-semibold tracking-[0.08em] text-[#080808]/60 mb-4">
                WHAT WE DO
              </p>
              <h2
                style={{ textWrap: 'balance' }}
                className="text-[36px] sm:text-[52px] lg:text-[64px] font-bold tracking-[-0.03em] leading-[1.05] text-[#080808]"
              >
                The work you need.
                <br />
                Done properly.
              </h2>
            </div>
          </div>

          {/* Horizontal Scroll Track on Desktop / Stacked Grid on Mobile & Tablet */}
          <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
            <div
              ref={servicesGridRef}
              style={{
                transform:
                  isDesktop && !prefersReducedMotion
                    ? `translate3d(${serviceHorizontalX}vw, 0, 0)`
                    : 'none',
                transition: isDesktop ? 'transform 90ms linear' : 'none',
              }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 w-full will-change-transform"
            >
              {services.map((service) => (
                <article
                  key={service.id}
                  id={service.id}
                  onClick={() =>
                    scrollToTarget(
                      'contact',
                      service.title as 'Plumbing' | 'Electrical' | 'Urgent Service'
                    )
                  }
                  style={{
                    opacity: servicesGridVisible ? 1 : 0,
                    transform: servicesGridVisible ? 'translateY(0px)' : 'translateY(22px)',
                    transition: `opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) ${service.delay}ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) ${service.delay}ms`,
                  }}
                  className="ScrollAnchor cursor-pointer group"
                >
                  <div className="service-card-wf h-full bg-[#FFFFFF] border border-[#E0E0E0] rounded-[6px] p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[12px] font-medium text-[#080808]/50 tabular-nums mb-6">
                        <span>{service.index}</span>
                        <span className="text-[#146EF5] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Request →
                        </span>
                      </div>

                      <div className="aspect-[4/3] w-full rounded-[4px] overflow-hidden mb-7 bg-[#F5F5F5] border border-[#E0E0E0]/60">
                        <EditorialImage
                          src={service.image}
                          alt={service.alt}
                          fallbackLabel={service.title}
                          className="w-full h-full"
                          imgClassName="service-img-wf"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="inline-block relative pb-1">
                        <h3 className="text-[26px] sm:text-[30px] font-bold tracking-[-0.025em] text-[#080808]">
                          {service.title}
                        </h3>
                        <span className="service-title-line absolute left-0 bottom-0 w-full h-[2px] bg-[#146EF5]" />
                      </div>
                      <p className="mt-2.5 text-[16px] sm:text-[17px] text-[#080808]/75 leading-[1.5]">
                        {service.copy}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST SECTION (Large Editorial Statement) */}
        <section
          ref={trustSectionRef}
          className="relative py-28 sm:py-40 lg:py-52 border-b border-[#E0E0E0] bg-[#FFFFFF] overflow-hidden"
        >
          {/* Visible Section Background Image + WCAG >= 4.5:1 Calibrated Scrim */}
          <div
            aria-hidden="true"
            style={{
              backgroundImage: `url("${SERVICE_URGENT_IMG}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FFFFFF]/97 via-[#FFFFFF]/90 to-[#FFFFFF]/38"
          />

          <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="max-w-[980px]">
              <h2 className="text-[42px] sm:text-[68px] lg:text-[88px] font-bold tracking-[-0.035em] leading-[1.04] text-[#080808]">
                <span
                  style={{
                    display: 'block',
                    opacity: trustVisible ? 1 : 0.15,
                    transform: trustVisible ? 'translateY(0px)' : 'translateY(24px)',
                    transition:
                      'opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) 0ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) 0ms',
                  }}
                >
                  Show up.
                </span>
                <span
                  style={{
                    display: 'block',
                    opacity: trustVisible ? 1 : 0.15,
                    transform: trustVisible ? 'translateY(0px)' : 'translateY(24px)',
                    transition:
                      'opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) 90ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) 90ms',
                  }}
                >
                  Find the problem.
                </span>
                <span
                  style={{
                    display: 'block',
                    opacity: trustVisible ? 1 : 0.15,
                    transform: trustVisible ? 'translateY(0px)' : 'translateY(24px)',
                    transition:
                      'opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) 180ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) 180ms',
                  }}
                  className="text-[#0F5CD1]"
                >
                  Fix it properly.
                </span>
              </h2>

              <p
                style={{
                  opacity: trustVisible ? 1 : 0,
                  transform: trustVisible ? 'translateY(0px)' : 'translateY(24px)',
                  transition:
                    'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) 240ms, transform 500ms cubic-bezier(0.22, 1, 0.36, 1) 240ms',
                }}
                className="mt-8 sm:mt-12 text-[18px] sm:text-[22px] text-[#080808]/75 max-w-[46ch] leading-[1.5]"
              >
                Clear communication from the first call to the finished job.
              </p>
            </div>
          </div>
        </section>

        {/* NEW SECTION 1: ARCHITECTURAL CRAFTSMANSHIP & WORKSITE STANDARD */}
        <section
          id="craftsmanship"
          ref={craftSectionRef}
          className="relative py-20 sm:py-28 lg:py-36 border-b border-[#E0E0E0] bg-[#FFFFFF] overflow-hidden"
        >
          {/* Visible Section Background Image + WCAG >= 4.5:1 Calibrated Scrim */}
          <div
            aria-hidden="true"
            style={{
              backgroundImage: `url("${CRAFT_WORKSITE_IMG}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="pointer-events-none absolute inset-0 opacity-[0.30]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FFFFFF]/96 via-[#FFFFFF]/88 to-[#FFFFFF]/55"
          />

          <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
            {/* Section Header */}
            <div
              style={{
                opacity: craftVisible ? 1 : 0,
                transform: craftVisible ? 'translateY(0px)' : 'translateY(28px)',
                transition:
                  'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              className="max-w-[780px] mb-14 sm:mb-20"
            >
              <p className="text-[12px] sm:text-[13px] font-semibold tracking-[0.08em] text-[#080808]/60 mb-4">
                IN THE HOME
              </p>
              <h2
                style={{ textWrap: 'balance' }}
                className="text-[36px] sm:text-[52px] lg:text-[64px] font-bold tracking-[-0.03em] leading-[1.05] text-[#080808]"
              >
                Respect for the house.
                <br />
                Precision in the wall.
              </h2>
              <p className="mt-5 text-[17px] sm:text-[19px] text-[#080808]/75 max-w-[54ch] leading-[1.55]">
                Drop cloths go down before tools come out. Every valve, pipe run, and junction is
                routed cleanly and tested before we leave.
              </p>
            </div>

            {/* Dual-Image Asymmetric Composition with Mask Reveal & Opposing Scroll Parallax */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Primary 8-Column Image (Curtain Reveal + Upward Parallax) */}
              <div
                style={{
                  clipPath:
                    craftVisible || prefersReducedMotion
                      ? 'inset(0 0 0% 0)'
                      : 'inset(0 0 100% 0)',
                  transition: 'clip-path 850ms cubic-bezier(0.22, 1, 0.36, 1) 80ms',
                }}
                className="lg:col-span-8 rounded-[6px] overflow-hidden border border-[#E0E0E0] bg-[#F5F5F5]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <EditorialImage
                    src={CRAFT_WORKSITE_IMG}
                    alt="Protected hardwood floor with canvas drop cloth, organized steel wrenches, and gleaming copper supply lines"
                    fallbackLabel="Clean Worksite & Copper Supply Installation"
                    className="w-full h-full"
                    imgClassName="will-change-transform"
                    style={{
                      transform:
                        isDesktop && !prefersReducedMotion
                          ? `scale(1.08) translate3d(0, ${craftPrimaryParallax}%, 0)`
                          : 'none',
                      transition: 'transform 120ms linear',
                    }}
                  />
                </div>
                <div className="px-5 py-3.5 bg-[#FFFFFF] border-t border-[#E0E0E0] flex items-center justify-between text-[13px] text-[#080808]/65">
                  <span>01 · Plumbing fixture &amp; supply manifold</span>
                  <span>Protected residential interior</span>
                </div>
              </div>

              {/* Secondary 4-Column Offset Image (Opposing Downward Parallax) */}
              <div
                style={{
                  opacity: craftVisible ? 1 : 0,
                  transform: craftVisible ? 'translateY(0px)' : 'translateY(32px)',
                  transition:
                    'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) 220ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1) 220ms',
                }}
                className="lg:col-span-4 lg:mt-16 rounded-[6px] overflow-hidden border border-[#E0E0E0] bg-[#F5F5F5]"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <EditorialImage
                    src={CRAFT_ELECTRICAL_IMG}
                    alt="Clean brushed steel electrical conduit and modern wall switch detail"
                    fallbackLabel="Precision Electrical Conduit & Switchwork"
                    className="w-full h-full"
                    imgClassName="will-change-transform"
                    style={{
                      transform:
                        isDesktop && !prefersReducedMotion
                          ? `scale(1.09) translate3d(0, ${craftSecondaryParallax}%, 0)`
                          : 'none',
                      transition: 'transform 120ms linear',
                    }}
                  />
                </div>
                <div className="px-5 py-3.5 bg-[#FFFFFF] border-t border-[#E0E0E0] flex items-center justify-between text-[13px] text-[#080808]/65">
                  <span>02 · Electrical troubleshooting</span>
                  <span>Clean wall finish</span>
                </div>
              </div>
            </div>

            {/* 3-Column Worksite Discipline Strip */}
            <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-[#E0E0E0]">
              {[
                {
                  num: '01',
                  heading: 'Protected work areas',
                  text: 'Floor runners and clean drop cloths protect hardwood, tile, and cabinetry throughout the job.',
                  delay: 120,
                },
                {
                  num: '02',
                  heading: 'Clear scope upfront',
                  text: 'We show you the exact fault or worn component and explain the fix before work starts.',
                  delay: 200,
                },
                {
                  num: '03',
                  heading: 'Verified before departure',
                  text: 'Every joint is pressure-checked and every circuit is tested under load before we pack up.',
                  delay: 280,
                },
              ].map((item) => (
                <div
                  key={item.num}
                  style={{
                    opacity: craftVisible ? 1 : 0,
                    transform: craftVisible ? 'translateY(0px)' : 'translateY(22px)',
                    transition: `opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) ${item.delay}ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) ${item.delay}ms`,
                  }}
                >
                  <span className="text-[12px] font-semibold text-[#146EF5] tabular-nums">
                    {item.num}
                  </span>
                  <h3 className="mt-2 text-[20px] sm:text-[22px] font-bold tracking-[-0.02em] text-[#080808]">
                    {item.heading}
                  </h3>
                  <p className="mt-2 text-[15px] sm:text-[16px] text-[#080808]/70 leading-[1.55]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SAN FRANCISCO HOMES SECTION (Pinned on Desktop, Vertical Stack on Mobile) */}
        <section
          ref={sfPinnedRef}
          className="relative border-b border-[#E0E0E0] bg-[#F5F5F5] lg:min-h-[185vh]"
        >
          {/* Visible Architectural Background Image Layer + WCAG >= 4.5:1 Scrim */}
          <div
            aria-hidden="true"
            style={{
              backgroundImage: `url("${SF_HOMES_IMG}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: isDesktop ? 'fixed' : 'scroll',
            }}
            className="pointer-events-none absolute inset-0 opacity-[0.34]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#F5F5F5]/96 via-[#F5F5F5]/88 to-[#F5F5F5]/72"
          />
          {/* Desktop Sticky Wrapper */}
          <div className="relative z-10 lg:sticky lg:top-0 lg:min-h-screen flex items-center py-20 sm:py-28 lg:py-24">
            <div className="max-w-[1360px] w-full mx-auto px-5 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Left Side: Visually Anchored Headline + Authentic SF Plumbing Image */}
                <div
                  style={{
                    opacity: isDesktop || sfMobileVisible ? 1 : 0,
                    transform:
                      isDesktop || sfMobileVisible ? 'translateY(0px)' : 'translateY(28px)',
                    transition:
                      'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className="lg:col-span-6 flex flex-col justify-between"
                >
                  <h2
                    style={{ textWrap: 'balance' }}
                    className="text-[36px] sm:text-[48px] lg:text-[56px] font-bold tracking-[-0.03em] leading-[1.06] text-[#080808]"
                  >
                    Built for San Francisco homes.
                  </h2>

                  <div
                    ref={sfImageRef}
                    className="mt-8 sm:mt-10 aspect-[4/3] w-full rounded-[6px] overflow-hidden border border-[#E0E0E0] bg-[#FFFFFF]"
                  >
                    <EditorialImage
                      src={SF_HOMES_IMG}
                      alt="Authentic residential copper and cast-iron plumbing work inside a San Francisco home"
                      fallbackLabel="San Francisco Residential Pipework & Fixtures"
                      className="w-full h-full"
                      imgClassName="will-change-transform"
                      style={{
                        transform:
                          isDesktop && !prefersReducedMotion
                            ? `scale(1.08) translate3d(0, ${sfParallaxY}%, 0)`
                            : 'none',
                        transition: 'transform 120ms linear',
                      }}
                    />
                  </div>
                </div>

                {/* Right Side: Guided Scroll Sequence on Desktop / Clean Stack on Mobile */}
                <div className="lg:col-span-6 lg:pl-8">
                  <div className="border-l border-[#E0E0E0] pl-6 sm:pl-10 space-y-8 sm:space-y-10">
                    {/* Statement 1: Old pipes. */}
                    <div
                      style={{
                        opacity: isDesktop
                          ? sfActiveStep >= 1
                            ? 1
                            : 0
                          : sfMobileVisible
                          ? 1
                          : 0,
                        transform: isDesktop
                          ? sfActiveStep >= 1
                            ? 'translateY(0px)'
                            : 'translateY(28px)'
                          : sfMobileVisible
                          ? 'translateY(0px)'
                          : 'translateY(28px)',
                        transition:
                          'opacity 450ms cubic-bezier(0.22, 1, 0.36, 1), transform 450ms cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      <span className="block text-[12px] font-medium text-[#080808]/45 tabular-nums mb-1">
                        01
                      </span>
                      <p className="text-[32px] sm:text-[44px] lg:text-[52px] font-bold tracking-[-0.03em] leading-[1.08] text-[#080808]">
                        Old pipes.
                      </p>
                    </div>

                    {/* Statement 2: Tight spaces. */}
                    <div
                      style={{
                        opacity: isDesktop
                          ? sfActiveStep >= 2
                            ? 1
                            : 0.18
                          : sfMobileVisible
                          ? 1
                          : 0,
                        transform: isDesktop
                          ? sfActiveStep >= 2
                            ? 'translateY(0px)'
                            : 'translateY(28px)'
                          : sfMobileVisible
                          ? 'translateY(0px)'
                          : 'translateY(28px)',
                        transition:
                          'opacity 450ms cubic-bezier(0.22, 1, 0.36, 1), transform 450ms cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      <span className="block text-[12px] font-medium text-[#080808]/45 tabular-nums mb-1">
                        02
                      </span>
                      <p className="text-[32px] sm:text-[44px] lg:text-[52px] font-bold tracking-[-0.03em] leading-[1.08] text-[#080808]">
                        Tight spaces.
                      </p>
                    </div>

                    {/* Statement 3: Unexpected problems. */}
                    <div
                      style={{
                        opacity: isDesktop
                          ? sfActiveStep >= 3
                            ? 1
                            : 0.18
                          : sfMobileVisible
                          ? 1
                          : 0,
                        transform: isDesktop
                          ? sfActiveStep >= 3
                            ? 'translateY(0px)'
                            : 'translateY(28px)'
                          : sfMobileVisible
                          ? 'translateY(0px)'
                          : 'translateY(28px)',
                        transition:
                          'opacity 450ms cubic-bezier(0.22, 1, 0.36, 1), transform 450ms cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      <span className="block text-[12px] font-medium text-[#080808]/45 tabular-nums mb-1">
                        03
                      </span>
                      <p className="text-[32px] sm:text-[44px] lg:text-[52px] font-bold tracking-[-0.03em] leading-[1.08] text-[#080808]">
                        Unexpected problems.
                      </p>
                    </div>

                    {/* Supporting copy */}
                    <div
                      style={{
                        opacity: isDesktop
                          ? sfActiveStep >= 1
                            ? 1
                            : 0
                          : sfMobileVisible
                          ? 1
                          : 0,
                        transform: isDesktop
                          ? sfActiveStep >= 1
                            ? 'translateY(0px)'
                            : 'translateY(20px)'
                          : sfMobileVisible
                          ? 'translateY(0px)'
                          : 'translateY(20px)',
                        transition:
                          'opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) 80ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) 80ms',
                      }}
                      className="pt-4 border-t border-[#E0E0E0]"
                    >
                      <p className="text-[17px] sm:text-[19px] text-[#080808]/75 leading-[1.55] max-w-[42ch]">
                        We work through the details and explain what needs to happen next.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEW SECTION 2: SAN FRANCISCO NEIGHBORHOOD DISPATCH & ARCHITECTURE */}
        <section
          id="neighborhoods"
          ref={dispatchSectionRef}
          className="relative py-20 sm:py-28 lg:py-36 border-b border-[#E0E0E0] bg-[#FFFFFF] overflow-hidden"
        >
          {/* Visible Section Background Image + WCAG >= 4.5:1 Calibrated Scrim */}
          <div
            aria-hidden="true"
            style={{
              backgroundImage: `url("${SF_NEIGHBORHOOD_IMG}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="pointer-events-none absolute inset-0 opacity-[0.32]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FFFFFF]/96 via-[#FFFFFF]/86 to-[#FFFFFF]/72"
          />

          <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
            {/* Section Header */}
            <div
              style={{
                opacity: dispatchVisible ? 1 : 0,
                transform: dispatchVisible ? 'translateY(0px)' : 'translateY(28px)',
                transition:
                  'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16"
            >
              <div className="max-w-[700px]">
                <p className="text-[12px] sm:text-[13px] font-semibold tracking-[0.08em] text-[#080808]/60 mb-4">
                  LOCAL DISPATCH · 2019 POWELL ST
                </p>
                <h2
                  style={{ textWrap: 'balance' }}
                  className="text-[36px] sm:text-[52px] lg:text-[64px] font-bold tracking-[-0.03em] leading-[1.05] text-[#080808]"
                >
                  From Powell Street
                  <br />
                  across the city.
                </h2>
              </div>

              <p className="text-[16px] sm:text-[18px] text-[#080808]/70 max-w-[42ch] leading-[1.55]">
                Based in North Beach at 2019 Powell St, we service residential buildings and
                single-family homes across San Francisco.
              </p>
            </div>

            {/* Scroll-Linked Progressive Scale & Horizontal Pan Architectural Image */}
            <div
              ref={dispatchImageRef}
              style={{
                transform:
                  isDesktop && !prefersReducedMotion ? `scale(${dispatchScale})` : 'none',
                transition: 'transform 120ms linear',
              }}
              className="rounded-[6px] overflow-hidden border border-[#E0E0E0] bg-[#F5F5F5] origin-center will-change-transform"
            >
              <div className="aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden">
                <EditorialImage
                  src={SF_NEIGHBORHOOD_IMG}
                  alt="San Francisco residential architecture along Powell Street in North Beach"
                  fallbackLabel="2019 Powell St, San Francisco — Local Service Dispatch"
                  className="w-full h-full"
                  imgClassName="will-change-transform"
                  style={{
                    transform:
                      isDesktop && !prefersReducedMotion
                        ? `scale(1.1) translate3d(${dispatchPanX}%, 0, 0)`
                        : 'none',
                    transition: 'transform 120ms linear',
                  }}
                />
              </div>
            </div>

            {/* Interactive San Francisco Building & Neighborhood Profiles */}
            <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {SF_ZONES.map((zone, idx) => {
                const isActive = activeZoneIndex === idx;
                return (
                  <div
                    key={zone.index}
                    onClick={() => setActiveZoneIndex(idx)}
                    style={{
                      opacity: dispatchVisible ? 1 : 0,
                      transform: dispatchVisible ? 'translateY(0px)' : 'translateY(24px)',
                      transition: `opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) ${
                        idx * 90
                      }ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) ${
                        idx * 90
                      }ms, border-color 250ms cubic-bezier(0.22, 1, 0.36, 1), background-color 250ms cubic-bezier(0.22, 1, 0.36, 1)`,
                    }}
                    className={`p-6 sm:p-8 rounded-[6px] border cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'border-[#080808] bg-[#F5F5F5]/70'
                        : 'border-[#E0E0E0] bg-[#FFFFFF] hover:border-[#080808]/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[12px] text-[#080808]/55 mb-5">
                        <span className="font-semibold text-[#146EF5] tabular-nums">
                          {zone.index}
                        </span>
                        <span>{zone.distance}</span>
                      </div>

                      <p className="text-[13px] font-medium text-[#080808]/60">{zone.area}</p>
                      <h3 className="mt-1.5 text-[22px] sm:text-[25px] font-bold tracking-[-0.02em] leading-[1.2] text-[#080808]">
                        {zone.headline}
                      </h3>
                      <p className="mt-3.5 text-[15px] text-[#080808]/75 leading-[1.55]">
                        {zone.detail}
                      </p>
                    </div>

                    {/* Clean Unboxed Metadata with Middot Separators */}
                    <div className="mt-6 pt-4 border-t border-[#E0E0E0] flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-[#080808]/55">
                      {zone.tags.map((tag, tIdx) => (
                        <React.Fragment key={tag}>
                          {tIdx > 0 && <span aria-hidden="true">·</span>}
                          <span>{tag}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* REVIEWS SECTION (Many Attributable San Francisco Reviews + Dual-Row Kinetic Motion & Filter) */}
        <section
          id="reviews"
          ref={reviewsSectionRef}
          className="relative py-20 sm:py-28 lg:py-36 border-b border-[#E0E0E0] bg-[#F5F5F5] overflow-hidden"
        >
          {/* Visible Section Background Image + WCAG >= 4.5:1 Calibrated Scrim */}
          <div
            aria-hidden="true"
            style={{
              backgroundImage: `url("${HERO_IMAGE}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="pointer-events-none absolute inset-0 opacity-[0.28]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F5F5F5]/96 via-[#F5F5F5]/88 to-[#F5F5F5]/78"
          />

          <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
            {/* Header + Interactive Filter Controls */}
            <div
              style={{
                opacity: reviewsVisible ? 1 : 0,
                transform: reviewsVisible ? 'translateY(0px)' : 'translateY(28px)',
                transition:
                  'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16"
            >
              <div className="max-w-[700px]">
                <p className="text-[12px] sm:text-[13px] font-semibold tracking-[0.08em] text-[#080808]/60 mb-4">
                  CLIENT REVIEWS
                </p>
                <h2
                  style={{ textWrap: 'balance' }}
                  className="text-[36px] sm:text-[52px] lg:text-[64px] font-bold tracking-[-0.03em] leading-[1.05] text-[#080808]"
                >
                  Work that speaks
                  <br />
                  for itself.
                </h2>
                <p className="mt-4 text-[17px] sm:text-[19px] text-[#080808]/75 max-w-[48ch] leading-[1.5]">
                  Feedback from San Francisco homeowners and building managers.
                </p>
              </div>

              {/* Functional Segmented Filter Bar */}
              <div
                role="tablist"
                aria-label="Filter client reviews by service"
                className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#FFFFFF] border border-[#E0E0E0] rounded-[6px] self-start lg:self-auto"
              >
                {(['All'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={reviewFilter === tab}
                    onClick={() => setReviewFilter(tab)}
                    className={`px-3.5 py-2 text-[13px] font-medium rounded-[4px] transition-colors cursor-pointer whitespace-nowrap ${
                      reviewFilter === tab
                        ? 'bg-[#080808] text-[#FFFFFF]'
                        : 'text-[#080808]/65 hover:text-[#080808]'
                    }`}
                  >
                    {tab === 'All' ? `All (${CLIENT_REVIEWS.length})` : tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dual-Row Kinetic Motion Stream when "All" is active & not reduced-motion */}
          {reviewFilter === 'All' && !prefersReducedMotion ? (
            <div
              style={{
                opacity: reviewsVisible ? 1 : 0,
                transform: reviewsVisible ? 'translateY(0px)' : 'translateY(28px)',
                transition:
                  'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) 120ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1) 120ms',
              }}
              className="relative z-10 space-y-6"
            >
              {/* Marquee Row 1 (Moves Left + Scroll Velocity Shift) */}
              <div
                style={{
                  transform: isDesktop ? `translate3d(${reviewScrollShift}px, 0, 0)` : 'none',
                  transition: 'transform 150ms linear',
                }}
                className="marquee-track overflow-hidden"
              >
                <div className="animate-marquee-left gap-6 px-3">
                  {[...rowOneReviews, ...rowOneReviews].map((rev, idx) => (
                    <article
                      key={`${rev.id}-r1-${idx}`}
                      className="w-[330px] sm:w-[420px] shrink-0 bg-[#FFFFFF] border border-[#E0E0E0] hover:border-[#080808] rounded-[6px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300"
                    >
                      <div>
                        {/* Quiet Unboxed Metadata */}
                        <div className="flex items-center gap-2 text-[12px] text-[#080808]/55 mb-4">
                          <span className="font-medium text-[#146EF5]">{rev.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{rev.neighborhood}</span>
                          <span aria-hidden="true">·</span>
                          <span>{rev.propertyType}</span>
                        </div>

                        <p className="text-[15px] sm:text-[16px] text-[#080808] leading-[1.6]">
                          &ldquo;{rev.quote}&rdquo;
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#E0E0E0] flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[14px] font-semibold text-[#080808]">{rev.name}</p>
                          <p className="text-[12px] text-[#080808]/55 mt-0.5">{rev.outcome}</p>
                        </div>
                        <span className="text-[12px] font-medium text-[#080808]/45 tabular-nums shrink-0">
                          SF, CA
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Marquee Row 2 (Moves Right + Opposite Scroll Velocity Shift) */}
              <div
                style={{
                  transform: isDesktop ? `translate3d(${-reviewScrollShift}px, 0, 0)` : 'none',
                  transition: 'transform 150ms linear',
                }}
                className="marquee-track overflow-hidden"
              >
                <div className="animate-marquee-right gap-6 px-3">
                  {[...rowTwoReviews, ...rowTwoReviews].map((rev, idx) => (
                    <article
                      key={`${rev.id}-r2-${idx}`}
                      className="w-[330px] sm:w-[420px] shrink-0 bg-[#FFFFFF] border border-[#E0E0E0] hover:border-[#080808] rounded-[6px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-[12px] text-[#080808]/55 mb-4">
                          <span className="font-medium text-[#146EF5]">{rev.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{rev.neighborhood}</span>
                          <span aria-hidden="true">·</span>
                          <span>{rev.propertyType}</span>
                        </div>

                        <p className="text-[15px] sm:text-[16px] text-[#080808] leading-[1.6]">
                          &ldquo;{rev.quote}&rdquo;
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#E0E0E0] flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[14px] font-semibold text-[#080808]">{rev.name}</p>
                          <p className="text-[12px] text-[#080808]/55 mt-0.5">{rev.outcome}</p>
                        </div>
                        <span className="text-[12px] font-medium text-[#080808]/45 tabular-nums shrink-0">
                          SF, CA
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Filtered Staggered Editorial Grid (or Reduced-Motion View) */
            <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReviews.map((rev, idx) => (
                  <article
                    key={rev.id}
                    style={{
                      opacity: reviewsVisible ? 1 : 0,
                      transform: reviewsVisible ? 'translateY(0px)' : 'translateY(20px)',
                      transition: `opacity 420ms cubic-bezier(0.22, 1, 0.36, 1) ${
                        idx * 60
                      }ms, transform 420ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * 60}ms`,
                    }}
                    className="bg-[#FFFFFF] border border-[#E0E0E0] hover:border-[#080808] rounded-[6px] p-6 sm:p-8 flex flex-col justify-between transition-colors duration-200"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[12px] text-[#080808]/55 mb-4">
                        <span className="font-medium text-[#146EF5]">{rev.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{rev.neighborhood}</span>
                        <span aria-hidden="true">·</span>
                        <span>{rev.propertyType}</span>
                      </div>

                      <p className="text-[15px] sm:text-[16px] text-[#080808] leading-[1.6]">
                        &ldquo;{rev.quote}&rdquo;
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#E0E0E0] flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[14px] font-semibold text-[#080808]">{rev.name}</p>
                        <p className="text-[12px] text-[#080808]/55 mt-0.5">{rev.outcome}</p>
                      </div>
                      <span className="text-[12px] font-medium text-[#080808]/45 tabular-nums shrink-0">
                        SF, CA
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* PROCESS SECTION */}
        <section className="relative py-20 sm:py-28 lg:py-36 border-b border-[#E0E0E0] bg-[#FFFFFF] overflow-hidden">
          {/* Visible Section Background Image + WCAG >= 4.5:1 Calibrated Scrim */}
          <div
            aria-hidden="true"
            style={{
              backgroundImage: `url("${SERVICE_ELECTRICAL_IMG}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="pointer-events-none absolute inset-0 opacity-[0.28]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FFFFFF]/96 via-[#FFFFFF]/90 to-[#FFFFFF]/62"
          />

          <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
            {/* Process Section Header */}
            <div
              ref={processHeaderRef}
              style={{
                opacity: processHeaderVisible ? 1 : 0,
                transform: processHeaderVisible ? 'translateY(0px)' : 'translateY(28px)',
                transition:
                  'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              className="max-w-[720px] mb-14 sm:mb-20"
            >
              <p className="text-[12px] sm:text-[13px] font-semibold tracking-[0.08em] text-[#080808]/60 mb-4">
                HOW IT WORKS
              </p>
              <h2
                style={{ textWrap: 'balance' }}
                className="text-[36px] sm:text-[52px] lg:text-[60px] font-bold tracking-[-0.03em] leading-[1.06] text-[#080808]"
              >
                Simple from start to finish.
              </h2>
            </div>

            {/* Process 3 Minimal Steps */}
            <div
              ref={processStepsRef}
              className="grid grid-cols-1 md:grid-cols-3 border-t border-[#E0E0E0]"
            >
              {processSteps.map((step, idx) => (
                <div
                  key={step.number}
                  style={{
                    opacity: processStepsVisible ? 1 : 0,
                    transform: processStepsVisible ? 'translateY(0px)' : 'translateY(20px)',
                    transition: `opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) ${step.delay}ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) ${step.delay}ms`,
                  }}
                  className={`py-10 sm:py-12 ${
                    idx < 2 ? ' border-b md:border-b-0 md:border-r border-[#E0E0E0]' : ''
                  } ${idx > 0 ? 'md:pl-10 lg:pl-12' : ''} ${idx < 2 ? 'md:pr-8 lg:pr-10' : ''}`}
                >
                  {/* Number label subtly fades in before text */}
                  <span
                    style={{
                      opacity: processStepsVisible ? 1 : 0,
                      transition: `opacity 350ms cubic-bezier(0.22, 1, 0.36, 1) ${Math.max(
                        0,
                        step.delay - 30
                      )}ms`,
                    }}
                    className="block text-[13px] font-semibold text-[#146EF5] tabular-nums tracking-[0.04em] mb-6"
                  >
                    {step.number}
                  </span>

                  <h3 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.025em] text-[#080808]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-[16px] sm:text-[17px] text-[#080808]/75 leading-[1.5]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section
          id="contact"
          ref={finalCtaRef}
          className="relative py-24 sm:py-32 lg:py-44 border-b border-[#E0E0E0] bg-[#FFFFFF] overflow-hidden"
        >
          {/* Visible Section Background Image + WCAG >= 4.5:1 Calibrated Scrim */}
          <div
            aria-hidden="true"
            style={{
              backgroundImage: `url("${CRAFT_ELECTRICAL_IMG}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="pointer-events-none absolute inset-0 opacity-[0.34]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FFFFFF]/96 via-[#FFFFFF]/88 to-[#FFFFFF]/42"
          />

          <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="max-w-[880px]">
              {/* Headline & Supporting Text (650ms, delay 0ms, translateY(35px) -> 0) */}
              <div
                style={{
                  opacity: finalCtaVisible ? 1 : 0,
                  transform: finalCtaVisible ? 'translateY(0px)' : 'translateY(35px)',
                  transition:
                    'opacity 650ms cubic-bezier(0.22, 1, 0.36, 1) 0ms, transform 650ms cubic-bezier(0.22, 1, 0.36, 1) 0ms',
                }}
              >
                <h2 className="text-[44px] sm:text-[68px] lg:text-[84px] font-bold tracking-[-0.035em] leading-[1.02] text-[#080808]">
                  Need a fix?
                </h2>
                <p className="mt-4 sm:mt-6 text-[18px] sm:text-[22px] text-[#080808]/75 leading-[1.5]">
                  Call Klein Brothers Plumbing &amp; Electrical.
                </p>
              </div>

              {/* Large Phone Number (500ms, delay 100ms, translateY(20px) -> 0) */}
              <div
                style={{
                  opacity: finalCtaVisible ? 1 : 0,
                  transform: finalCtaVisible ? 'translateY(0px)' : 'translateY(20px)',
                  transition:
                    'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) 100ms, transform 500ms cubic-bezier(0.22, 1, 0.36, 1) 100ms',
                }}
                className="mt-8 sm:mt-10"
              >
                <a
                  href={PHONE_HREF}
                  className="inline-block text-[32px] sm:text-[52px] lg:text-[64px] font-bold tracking-[-0.03em] leading-[1.08] text-[#080808] hover:text-[#146EF5] transition-colors duration-200 tabular-nums"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>

              {/* Primary Button & Secondary Text Link (450ms, delay 180ms, translateY(16px) -> 0) */}
              <div
                style={{
                  opacity: finalCtaVisible ? 1 : 0,
                  transform: finalCtaVisible ? 'translateY(0px)' : 'translateY(16px)',
                  transition:
                    'opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) 180ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) 180ms',
                }}
                className="mt-9 sm:mt-12 flex flex-wrap items-center gap-6 sm:gap-8"
              >
                <a
                  href={PHONE_HREF}
                  className="btn-primary-wf inline-flex items-center justify-center px-7 sm:px-8 py-4 text-[15px] sm:text-[16px] font-medium rounded-[6px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#146EF5]"
                >
                  <RollingButtonContent>
                    <Phone className="w-4 h-4" />
                    <span>Call Klein Brothers</span>
                  </RollingButtonContent>
                </a>

                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-editorial-wf py-2 text-[15px] sm:text-[16px] font-medium text-[#080808] whitespace-nowrap"
                >
                  <span>Get Directions</span>
                  <ArrowUpRight className="w-4 h-4 link-arrow-wf" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setServiceDrawerOpen((prev) => !prev);
                    setFormSubmitted(false);
                  }}
                  className="link-editorial-wf py-2 text-[14px] sm:text-[15px] font-medium text-[#080808]/65 hover:text-[#080808] transition-colors duration-200 whitespace-nowrap cursor-pointer"
                >
                  <span>{serviceDrawerOpen ? 'Close Service Request' : 'Request a Callback'}</span>
                </button>
              </div>

              {/* Minimalist Service Request Panel */}
              {serviceDrawerOpen && (
                <div className="mt-12 pt-10 border-t border-[#E0E0E0] max-w-[600px]">
                  {formSubmitted ? (
                    <div className="p-6 sm:p-8 bg-[#F5F5F5] border border-[#E0E0E0] rounded-[6px]">
                      <div className="flex items-center gap-2.5 text-[#080808] font-semibold text-[18px]">
                        <Check className="w-5 h-5 text-[#146EF5]" />
                        <span>Service request received.</span>
                      </div>
                      <p className="mt-2 text-[15px] text-[#080808]/75 leading-[1.5]">
                        Thank you, {requesterName}. We have noted your{' '}
                        {selectedCategory.toLowerCase()} request and will call{' '}
                        <span className="font-medium text-[#080808] tabular-nums">
                          {requesterPhone}
                        </span>{' '}
                        shortly. For immediate assistance, call{' '}
                        <a href={PHONE_HREF} className="text-[#146EF5] underline">
                          {PHONE_DISPLAY}
                        </a>
                        .
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setFormSubmitted(false);
                          setRequesterName('');
                          setRequesterPhone('');
                          setRequesterDetails('');
                          setServiceDrawerOpen(false);
                        }}
                        className="btn-secondary-wf mt-5 px-5 py-2.5 text-[13px] font-medium rounded-[6px] cursor-pointer"
                      >
                        <RollingButtonContent>
                          <span>Done</span>
                        </RollingButtonContent>
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleServiceSubmit} noValidate className="space-y-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[18px] font-semibold text-[#080808]">
                          Request Service in San Francisco
                        </h3>
                        <span className="text-[13px] text-[#080808]/55">2019 Powell St</span>
                      </div>

                      {/* Segmented Service Control */}
                      <div>
                        <label className="block text-[12px] font-medium text-[#080808]/60 mb-2">
                          Service needed
                        </label>
                        <div className="grid grid-cols-3 gap-2 p-1 bg-[#F5F5F5] border border-[#E0E0E0] rounded-[6px]">
                          {(['Plumbing', 'Electrical', 'Urgent Service'] as const).map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setSelectedCategory(cat)}
                              className={`py-2 px-3 text-[13px] font-medium rounded-[4px] transition-colors cursor-pointer whitespace-nowrap truncate ${
                                selectedCategory === cat
                                  ? 'bg-[#FFFFFF] text-[#080808] border border-[#E0E0E0]'
                                  : 'text-[#080808]/65 hover:text-[#080808]'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="req-name"
                            className="block text-[12px] font-medium text-[#080808]/60 mb-1.5"
                          >
                            Name
                          </label>
                          <input
                            id="req-name"
                            type="text"
                            value={requesterName}
                            onChange={(e) => setRequesterName(e.target.value)}
                            placeholder="Your name"
                            className="w-full px-3.5 py-2.5 text-[15px] bg-[#FFFFFF] border border-[#E0E0E0] rounded-[6px] text-[#080808] placeholder:text-[#080808]/35 focus:outline-none focus:border-[#146EF5]"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="req-phone"
                            className="block text-[12px] font-medium text-[#080808]/60 mb-1.5"
                          >
                            Phone number
                          </label>
                          <input
                            id="req-phone"
                            type="tel"
                            value={requesterPhone}
                            onChange={(e) => setRequesterPhone(e.target.value)}
                            placeholder="(415) 555-0199"
                            className="w-full px-3.5 py-2.5 text-[15px] bg-[#FFFFFF] border border-[#E0E0E0] rounded-[6px] text-[#080808] placeholder:text-[#080808]/35 focus:outline-none focus:border-[#146EF5] tabular-nums"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="req-details"
                          className="block text-[12px] font-medium text-[#080808]/60 mb-1.5"
                        >
                          What&apos;s happening (optional)
                        </label>
                        <input
                          id="req-details"
                          type="text"
                          value={requesterDetails}
                          onChange={(e) => setRequesterDetails(e.target.value)}
                          placeholder="Brief description of the plumbing or electrical issue"
                          className="w-full px-3.5 py-2.5 text-[15px] bg-[#FFFFFF] border border-[#E0E0E0] rounded-[6px] text-[#080808] placeholder:text-[#080808]/35 focus:outline-none focus:border-[#146EF5]"
                        />
                      </div>

                      {formError && (
                        <p className="text-[13px] text-[#080808] bg-[#F5F5F5] border-l-2 border-[#146EF5] px-3 py-2">
                          {formError}
                        </p>
                      )}

                      <div className="flex items-center gap-3 pt-1">
                        <button
                          type="submit"
                          className="btn-primary-wf px-6 py-3 text-[14px] font-medium rounded-[6px] cursor-pointer whitespace-nowrap"
                        >
                          <RollingButtonContent>
                            <span>Send Request</span>
                          </RollingButtonContent>
                        </button>
                        <button
                          type="button"
                          onClick={() => setServiceDrawerOpen(false)}
                          className="btn-secondary-wf px-4 py-3 text-[14px] font-medium rounded-[6px] cursor-pointer whitespace-nowrap"
                        >
                          <RollingButtonContent>
                            <span>Cancel</span>
                          </RollingButtonContent>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* REDESIGNED STYLISH ANIMATED FOOTER */}
      <footer
        ref={footerRef}
        className="relative bg-[#080808] text-[#FFFFFF] pt-16 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 overflow-hidden selection:bg-[#146EF5] selection:text-[#FFFFFF]"
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Top Utility & Back-to-Top Bar */}
          <div
            style={{
              opacity: footerVisible ? 1 : 0,
              transform: footerVisible ? 'translateY(0px)' : 'translateY(20px)',
              transition:
                'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) 0ms, transform 500ms cubic-bezier(0.22, 1, 0.36, 1) 0ms',
            }}
            className="flex flex-wrap items-center justify-between gap-4 pb-8"
          >
            <div className="flex items-center gap-3 text-[12px] sm:text-[13px] tracking-[0.06em] font-medium text-[#FFFFFF]/55">
              <span className="inline-block w-2 h-2 rounded-full bg-[#146EF5]" />
              <span>SAN FRANCISCO PLUMBING &amp; ELECTRICAL</span>
            </div>

            <button
              type="button"
              onClick={() => scrollToTarget('top')}
              className="btn-footer-outline px-4 py-2 text-[12px] sm:text-[13px] font-medium rounded-[6px] cursor-pointer whitespace-nowrap"
            >
              <RollingButtonContent>
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </RollingButtonContent>
            </button>
          </div>

          {/* Animated Horizontal Hairline Rule */}
          <div
            style={{
              transform: footerVisible ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left center',
              transition: 'transform 750ms cubic-bezier(0.22, 1, 0.36, 1) 60ms',
            }}
            className="w-full h-[1px] bg-[#FFFFFF]/15"
          />

          {/* Main 12-Column Architectural Footer Grid */}
          <div className="py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
            {/* Column 1 (5 cols): Direct Dispatch & Location */}
            <div
              style={{
                opacity: footerVisible ? 1 : 0,
                transform: footerVisible ? 'translateY(0px)' : 'translateY(28px)',
                transition:
                  'opacity 550ms cubic-bezier(0.22, 1, 0.36, 1) 100ms, transform 550ms cubic-bezier(0.22, 1, 0.36, 1) 100ms',
              }}
              className="lg:col-span-5 flex flex-col justify-between space-y-8"
            >
              <div>
                <p className="text-[12px] font-medium tracking-[0.06em] text-[#FFFFFF]/45 mb-3">
                  DIRECT DISPATCH
                </p>
                <a
                  href={PHONE_HREF}
                  className="inline-block text-[32px] sm:text-[42px] font-bold tracking-[-0.03em] leading-[1.05] text-[#FFFFFF] hover:text-[#146EF5] transition-colors duration-300 tabular-nums"
                >
                  {PHONE_DISPLAY}
                </a>
                <p className="mt-4 text-[15px] sm:text-[16px] text-[#FFFFFF]/65 max-w-[36ch] leading-[1.55]">
                  Fast response. Clear communication. Careful work across San Francisco.
                </p>
              </div>

              <div className="pt-6 border-t border-[#FFFFFF]/12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <p className="text-[12px] font-medium tracking-[0.06em] text-[#FFFFFF]/45 mb-2">
                    SHOP ADDRESS
                  </p>
                  <address className="not-italic text-[15px] sm:text-[16px] text-[#FFFFFF]/85 leading-[1.6]">
                    2019 Powell St
                    <br />
                    San Francisco, CA 94133
                  </address>
                </div>

                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-editorial-wf link-editorial-footer py-1 text-[14px] font-medium text-[#FFFFFF]/80 hover:text-[#FFFFFF] self-start sm:self-end whitespace-nowrap"
                >
                  <span>Get Directions</span>
                  <ArrowUpRight className="w-4 h-4 link-arrow-wf text-[#146EF5]" />
                </a>
              </div>
            </div>

            {/* Column 2 (4 cols): Animated Interactive Directory */}
            <div
              style={{
                opacity: footerVisible ? 1 : 0,
                transform: footerVisible ? 'translateY(0px)' : 'translateY(28px)',
                transition:
                  'opacity 550ms cubic-bezier(0.22, 1, 0.36, 1) 180ms, transform 550ms cubic-bezier(0.22, 1, 0.36, 1) 180ms',
              }}
              className="lg:col-span-4 lg:pl-6"
            >
              <p className="text-[12px] font-medium tracking-[0.06em] text-[#FFFFFF]/45 mb-4">
                INDEX
              </p>
              <nav aria-label="Footer Navigation" className="divide-y divide-[#FFFFFF]/12 border-t border-b border-[#FFFFFF]/12">
                {mobileNavLinks.map((item) => (
                  <a
                    key={item.target}
                    href={`#${item.target}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToTarget(item.target);
                    }}
                    className="footer-nav-link py-3.5 flex items-center justify-between text-[15px] sm:text-[16px] font-medium text-[#FFFFFF]/75"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-[11px] font-semibold text-[#146EF5] tabular-nums">
                        {item.index}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 footer-link-arrow text-[#FFFFFF]/35 opacity-60" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Column 3 (3 cols): Service Scope & Quick Actions */}
            <div
              style={{
                opacity: footerVisible ? 1 : 0,
                transform: footerVisible ? 'translateY(0px)' : 'translateY(28px)',
                transition:
                  'opacity 550ms cubic-bezier(0.22, 1, 0.36, 1) 260ms, transform 550ms cubic-bezier(0.22, 1, 0.36, 1) 260ms',
              }}
              className="lg:col-span-3 flex flex-col justify-between space-y-8"
            >
              <div>
                <p className="text-[12px] font-medium tracking-[0.06em] text-[#FFFFFF]/45 mb-4">
                  CAPABILITIES
                </p>
                <ul className="space-y-2.5 text-[14px] sm:text-[15px] text-[#FFFFFF]/75">
                  <li className="flex items-center justify-between py-1 border-b border-[#FFFFFF]/10">
                    <span>Plumbing</span>
                    <span className="text-[12px] text-[#FFFFFF]/45">Drains · Fixtures · Pipes</span>
                  </li>
                  <li className="flex items-center justify-between py-1 border-b border-[#FFFFFF]/10">
                    <span>Electrical</span>
                    <span className="text-[12px] text-[#FFFFFF]/45">Repairs · Troubleshooting</span>
                  </li>
                  <li className="flex items-center justify-between py-1 border-b border-[#FFFFFF]/10">
                    <span>Urgent Service</span>
                    <span className="text-[12px] text-[#146EF5]">Priority Dispatch</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-2.5">
                <a
                  href={PHONE_HREF}
                  className="btn-footer-primary w-full inline-flex items-center justify-center py-3.5 px-5 text-[14px] font-medium rounded-[6px] whitespace-nowrap tabular-nums"
                >
                  <RollingButtonContent>
                    <Phone className="w-4 h-4" />
                    <span>Call (415) 908-1466</span>
                  </RollingButtonContent>
                </a>
                <button
                  type="button"
                  onClick={() => scrollToTarget('contact', 'Plumbing')}
                  className="btn-footer-outline w-full inline-flex items-center justify-center py-3 px-5 text-[14px] font-medium rounded-[6px] whitespace-nowrap cursor-pointer"
                >
                  <RollingButtonContent>
                    <span>Get Service</span>
                  </RollingButtonContent>
                </button>
              </div>
            </div>
          </div>

          {/* Monumental Masked Brand Wordmark Reveal */}
          <div className="pt-8 sm:pt-12 border-t border-[#FFFFFF]/15 overflow-hidden">
            <div
              style={{
                transform: footerVisible ? 'translate3d(0, 0%, 0)' : 'translate3d(0, 105%, 0)',
                transition: 'transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 220ms',
              }}
              className="flex flex-col md:flex-row md:items-baseline justify-between gap-2"
            >
              <p className="text-[40px] sm:text-[68px] lg:text-[96px] font-bold tracking-[-0.04em] leading-[0.95] text-[#FFFFFF] select-none">
                Klein Brothers
              </p>
              <span className="text-[14px] sm:text-[16px] font-medium text-[#146EF5] tracking-[-0.01em]">
                Plumbing &amp; Electrical · SF, CA
              </span>
            </div>
          </div>

          {/* Bottom Copyright & Neighborhood Bar */}
          <div
            style={{
              opacity: footerVisible ? 1 : 0,
              transition: 'opacity 550ms cubic-bezier(0.22, 1, 0.36, 1) 380ms',
            }}
            className="mt-8 pt-6 border-t border-[#FFFFFF]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[12px] sm:text-[13px] text-[#FFFFFF]/45"
          >
            <p>© Klein Brothers Plumbing &amp; Electrical. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>North Beach</span>
              <span aria-hidden="true">·</span>
              <span>Russian Hill</span>
              <span aria-hidden="true">·</span>
              <span>Pacific Heights</span>
              <span aria-hidden="true">·</span>
              <span>Marina</span>
              <span aria-hidden="true">·</span>
              <span>Noe Valley</span>
              <span aria-hidden="true">·</span>
              <span>Sunset</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
