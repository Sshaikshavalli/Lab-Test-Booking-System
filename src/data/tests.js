/**
 * Canonical TEST DATA SHAPE  (owner: Shaiksha)
 * -------------------------------------------------------------
 * {
 *   id: string               unique, stable id (used in selectedTestIds)
 *   code: string             short fictional test code
 *   name: string
 *   kind: 'test' | 'package'
 *   category: one of CATEGORIES
 *   sampleType: one of SAMPLE_TYPES
 *   fasting: boolean         true if fasting is (demo-)advised
 *   fastingHours: number     0 when not required
 *   price: number            indicative demo price in INR
 *   popularity: number       0-100 popularity indicator
 *   availability: one of AVAILABILITY
 *   turnaround: string       indicative turnaround text
 *   description: string
 *   parameters: string[]     included parameters (where applicable)
 *   preparation: string[]    DEMO preparation guidance
 *   concerns: string[]       body-system tags (see CONCERNS)
 *   discountPct, mrp         fictional discount % and struck-through price
 *   paramCount: number       number of included parameters
 * }
 * All content is FICTIONAL demonstration data.
 */

export const CATEGORIES = [
  'Haematology',
  'Biochemistry',
  'Clinical Pathology',
  'Microbiology',
  'Serology',
  'Health Packages',
];

export const SAMPLE_TYPES = ['Blood', 'Urine', 'Stool', 'Swab', 'Other', 'Multiple'];

export const AVAILABILITY = ['Available today', 'Next-day slot', 'Limited slots'];

const t = (id, code, name, category, sampleType, fasting, fastingHours, price, popularity, availability, turnaround, description, parameters, preparation, kind = 'test') => ({
  id, code, name, kind, category, sampleType, fasting, fastingHours, price, popularity, availability, turnaround, description, parameters, preparation,
});

const NO_PREP = ['No special preparation is advised in this demo.', 'Stay hydrated and carry a photo ID.'];
const FAST8 = ['Demo guidance: fast for 8–10 hours (water is fine).', 'Avoid heavy or fatty meals the evening before.', 'Take regular medication only as advised by your clinician.'];
const FAST12 = ['Demo guidance: fast for 12 hours (water is fine).', 'Avoid alcohol for 24 hours before sample collection.', 'Inform the phlebotomist about any supplements.'];
const URINE = ['Demo guidance: first-morning mid-stream sample preferred.', 'Use the sterile container provided.', 'Wash hands and clean the area before collecting.'];

const baseTests = [
  // ── Haematology ───────────────────────────────────────────
  t('t-cbc', 'HEM-101', 'Complete Blood Count (CBC)', 'Haematology', 'Blood', false, 0, 350, 98, 'Available today', 'Reports in about 6 hours',
    'A broad screening panel that counts and describes the main cells circulating in blood.',
    ['Haemoglobin', 'RBC count', 'WBC count', 'Platelet count', 'Haematocrit', 'MCV / MCH / MCHC'], NO_PREP),
  t('t-esr', 'HEM-102', 'Erythrocyte Sedimentation Rate (ESR)', 'Haematology', 'Blood', false, 0, 180, 62, 'Available today', 'Reports in about 4 hours',
    'A non-specific marker used alongside other tests to look for inflammation.', ['ESR (1st hour)'], NO_PREP),
  t('t-coag', 'HEM-110', 'Prothrombin Time (PT/INR)', 'Haematology', 'Blood', false, 0, 520, 48, 'Next-day slot', 'Reports in about 8 hours',
    'Measures how long blood takes to clot; commonly requested for clotting assessment.', ['PT', 'INR', 'Control'], ['Demo guidance: tell staff about any blood-thinning medication.', 'No fasting required.']),
  t('t-iron', 'HEM-120', 'Iron Studies', 'Haematology', 'Blood', true, 8, 890, 55, 'Limited slots', 'Reports in about 24 hours',
    'A group of measurements that describe iron levels and storage in the body.', ['Serum iron', 'TIBC', 'Transferrin saturation', 'Ferritin'], FAST8),
  t('t-retic', 'HEM-130', 'Reticulocyte Count', 'Haematology', 'Blood', false, 0, 280, 30, 'Available today', 'Reports in about 6 hours',
    'Counts young red blood cells to describe bone-marrow activity.', ['Reticulocyte %', 'Absolute count'], NO_PREP),

  // ── Biochemistry ──────────────────────────────────────────
  t('t-lipid', 'BIO-201', 'Lipid Profile', 'Biochemistry', 'Blood', true, 12, 650, 94, 'Available today', 'Reports in about 8 hours',
    'Describes cholesterol and triglyceride fractions in blood.', ['Total cholesterol', 'HDL', 'LDL', 'VLDL', 'Triglycerides', 'Cholesterol/HDL ratio'], FAST12),
  t('t-fbs', 'BIO-202', 'Fasting Blood Glucose', 'Biochemistry', 'Blood', true, 8, 120, 90, 'Available today', 'Reports in about 3 hours',
    'A single glucose measurement taken after an overnight fast.', ['Fasting glucose'], FAST8),
  t('t-hba1c', 'BIO-203', 'HbA1c (Glycated Haemoglobin)', 'Biochemistry', 'Blood', false, 0, 560, 86, 'Available today', 'Reports in about 12 hours',
    'Reflects average blood-sugar levels over roughly the past three months.', ['HbA1c %', 'Estimated average glucose'], ['No fasting required.', 'Demo guidance: carry previous reports if available.']),
  t('t-lft', 'BIO-210', 'Liver Function Test (LFT)', 'Biochemistry', 'Blood', true, 8, 780, 82, 'Available today', 'Reports in about 10 hours',
    'A panel of enzymes and proteins commonly used to look at liver function.', ['ALT', 'AST', 'ALP', 'Bilirubin (total/direct)', 'Total protein', 'Albumin', 'GGT'], FAST8),
  t('t-kft', 'BIO-211', 'Kidney Function Test (KFT)', 'Biochemistry', 'Blood', false, 0, 720, 78, 'Available today', 'Reports in about 10 hours',
    'A panel describing waste products and electrolytes handled by the kidneys.', ['Urea', 'Creatinine', 'Uric acid', 'Sodium', 'Potassium', 'Chloride'], ['Demo guidance: stay normally hydrated.', 'No fasting required.']),
  t('t-thy', 'BIO-220', 'Thyroid Profile (T3, T4, TSH)', 'Biochemistry', 'Blood', false, 0, 540, 92, 'Available today', 'Reports in about 12 hours',
    'Measures thyroid-related hormones commonly requested together.', ['Total T3', 'Total T4', 'TSH'], ['Demo guidance: morning samples are often preferred.', 'Mention any thyroid medication to staff.']),
  t('t-vitd', 'BIO-230', 'Vitamin D (25-OH)', 'Biochemistry', 'Blood', false, 0, 1100, 84, 'Limited slots', 'Reports in about 24 hours',
    'Measures circulating vitamin D, a nutrient linked with bone health.', ['25-hydroxy vitamin D'], NO_PREP),
  t('t-b12', 'BIO-231', 'Vitamin B12', 'Biochemistry', 'Blood', true, 6, 780, 58, 'Next-day slot', 'Reports in about 24 hours',
    'Measures vitamin B12 levels in blood.', ['Vitamin B12'], ['Demo guidance: fast for 6 hours.', 'Mention any supplements to staff.']),

  // ── Clinical Pathology ────────────────────────────────────
  t('t-urine', 'CLP-301', 'Urine Routine & Microscopy', 'Clinical Pathology', 'Urine', false, 0, 150, 80, 'Available today', 'Reports in about 4 hours',
    'A physical, chemical and microscopic examination of a urine sample.', ['Colour & appearance', 'pH', 'Specific gravity', 'Protein', 'Glucose', 'Ketones', 'Pus & epithelial cells'], URINE),
  t('t-stool', 'CLP-302', 'Stool Routine Examination', 'Clinical Pathology', 'Stool', false, 0, 190, 40, 'Next-day slot', 'Reports in about 24 hours',
    'A routine look at stool appearance and microscopic findings.', ['Colour & consistency', 'Occult blood', 'Ova & cysts', 'Pus cells'], ['Demo guidance: use the labelled container provided.', 'Deliver the sample to the collection point within 2 hours.']),
  t('t-microalb', 'CLP-310', 'Urine Microalbumin', 'Clinical Pathology', 'Urine', false, 0, 420, 44, 'Available today', 'Reports in about 12 hours',
    'Looks for small amounts of albumin in urine.', ['Urine albumin', 'Urine creatinine', 'Albumin/creatinine ratio'], URINE),
  t('t-semen', 'CLP-320', 'Semen Analysis', 'Clinical Pathology', 'Other', false, 0, 600, 28, 'Limited slots', 'Reports in about 24 hours',
    'Describes volume, concentration and movement of sperm in a sample.', ['Volume', 'Count', 'Motility', 'Morphology'], ['Demo guidance: 2–5 days of abstinence is typically specified.', 'Deliver to the lab within 30 minutes of collection.']),

  // ── Microbiology ──────────────────────────────────────────
  t('t-urcs', 'MIC-401', 'Urine Culture & Sensitivity', 'Microbiology', 'Urine', false, 0, 480, 66, 'Next-day slot', 'Reports in 48–72 hours',
    'Grows organisms from urine and tests which antibiotics they respond to.', ['Organism identification', 'Colony count', 'Antibiotic sensitivity'], URINE),
  t('t-throat', 'MIC-402', 'Throat Swab Culture', 'Microbiology', 'Swab', false, 0, 450, 38, 'Next-day slot', 'Reports in 48–72 hours',
    'Cultures organisms from a throat swab.', ['Organism identification', 'Antibiotic sensitivity'], ['Demo guidance: avoid mouthwash or gargles on the morning of the test.', 'Do not eat or drink 1 hour before.']),
  t('t-bcul', 'MIC-410', 'Blood Culture', 'Microbiology', 'Blood', false, 0, 950, 32, 'Limited slots', 'Reports in 3–5 days',
    'Looks for organisms in the bloodstream.', ['Aerobic culture', 'Anaerobic culture', 'Sensitivity (if growth)'], ['Demo guidance: sample is ideally taken before any antibiotic doses.', 'Tell staff if you are already on antibiotics.']),
  t('t-afb', 'MIC-420', 'AFB Smear (Sputum)', 'Microbiology', 'Other', false, 0, 260, 24, 'Next-day slot', 'Reports in about 24 hours',
    'Microscopic screening of a sputum sample.', ['AFB smear grading'], ['Demo guidance: early-morning, deep-cough sample preferred.', 'Rinse mouth with water before collecting.']),

  // ── Serology ──────────────────────────────────────────────
  t('t-dengue', 'SER-501', 'Dengue NS1 + IgM/IgG', 'Serology', 'Blood', false, 0, 1200, 76, 'Available today', 'Reports in about 8 hours',
    'A combination test often requested during fever outbreaks.', ['NS1 antigen', 'IgM antibody', 'IgG antibody'], NO_PREP),
  t('t-widal', 'SER-502', 'Widal Test', 'Serology', 'Blood', false, 0, 240, 46, 'Available today', 'Reports in about 6 hours',
    'A serological test using agglutination titres.', ['Typhoid O', 'Typhoid H', 'Paratyphoid AH', 'Paratyphoid BH'], NO_PREP),
  t('t-crp', 'SER-510', 'C-Reactive Protein (CRP)', 'Serology', 'Blood', false, 0, 460, 70, 'Available today', 'Reports in about 6 hours',
    'A blood protein that rises with inflammation.', ['CRP (quantitative)'], NO_PREP),
  t('t-hiv', 'SER-520', 'Hepatitis B Surface Antigen (HBsAg)', 'Serology', 'Blood', false, 0, 380, 52, 'Available today', 'Reports in about 8 hours',
    'Screens for the surface antigen of the hepatitis B virus.', ['HBsAg (screen)'], ['No fasting required.', 'Demo guidance: pre-test counselling may be offered by real labs.']),

  // ── Health Packages ───────────────────────────────────────
  t('p-basic', 'PKG-901', 'Basic Wellness Package', 'Health Packages', 'Multiple', true, 10, 1499, 96, 'Available today', 'Reports in about 24 hours',
    'A starter panel combining common blood and urine screens.', ['CBC', 'Fasting glucose', 'Lipid profile', 'Urine routine', 'Creatinine'], FAST8, 'package'),
  t('p-diab', 'PKG-902', 'Diabetes Care Package', 'Health Packages', 'Multiple', true, 10, 1799, 85, 'Available today', 'Reports in about 24 hours',
    'Glucose-focused monitoring bundle.', ['Fasting glucose', 'HbA1c', 'Kidney function', 'Urine microalbumin', 'Lipid profile'], FAST8, 'package'),
  t('p-heart', 'PKG-903', 'Heart Health Package', 'Health Packages', 'Multiple', true, 12, 2499, 74, 'Limited slots', 'Reports in about 24 hours',
    'Lipid and inflammation markers commonly grouped for cardiac-risk screening.', ['Lipid profile', 'CRP', 'HbA1c', 'Liver function', 'Kidney function'], FAST12, 'package'),
  t('p-full', 'PKG-910', 'Comprehensive Full-Body Package', 'Health Packages', 'Multiple', true, 12, 4299, 88, 'Next-day slot', 'Reports in about 48 hours',
    'A wide-ranging panel spanning blood, thyroid, vitamin, liver, kidney and urine screens.', ['CBC', 'Lipid profile', 'LFT', 'KFT', 'Thyroid profile', 'Vitamin D', 'Vitamin B12', 'HbA1c', 'Urine routine'], FAST12, 'package'),
];

const CONCERN_MAP = {
  't-cbc': ['Blood', 'Infection'], 't-esr': ['Infection'], 't-coag': ['Blood', 'Heart'], 't-iron': ['Blood', 'Vitamins'], 't-retic': ['Blood'],
  't-lipid': ['Heart'], 't-fbs': ['Diabetes'], 't-hba1c': ['Diabetes'], 't-lft': ['Liver'], 't-kft': ['Kidney'], 't-thy': ['Thyroid'],
  't-vitd': ['Vitamins'], 't-b12': ['Vitamins'], 't-urine': ['Kidney'], 't-stool': ['Gut'], 't-microalb': ['Kidney', 'Diabetes'], 't-semen': ['Fertility'],
  't-urcs': ['Infection', 'Kidney'], 't-throat': ['Infection'], 't-bcul': ['Infection'], 't-afb': ['Infection'], 't-dengue': ['Infection'],
  't-widal': ['Infection', 'Gut'], 't-crp': ['Heart', 'Infection'], 't-hiv': ['Liver', 'Infection'],
  'p-basic': ['Full Body'], 'p-diab': ['Diabetes'], 'p-heart': ['Heart'], 'p-full': ['Full Body'],
};

/** Fictional demo discount % (shown as a struck-through "MRP"). 0 = no discount. */
const DISCOUNT_MAP = { 't-cbc': 15, 't-lipid': 20, 't-thy': 25, 't-vitd': 30, 't-hba1c': 10, 't-lft': 15, 't-dengue': 20, 't-b12': 25, 't-iron': 15, 'p-basic': 35, 'p-diab': 30, 'p-heart': 40, 'p-full': 45 };

export const CONCERNS = ['Blood', 'Heart', 'Diabetes', 'Thyroid', 'Liver', 'Kidney', 'Vitamins', 'Infection', 'Gut', 'Fertility', 'Full Body'];

/** Adds: concerns (body-system tags), discountPct, mrp (struck-through price), paramCount. `price` stays the payable demo price. */
export const tests = baseTests.map((t) => {
  const discountPct = DISCOUNT_MAP[t.id] ?? 0;
  return {
    ...t,
    concerns: CONCERN_MAP[t.id] ?? [],
    discountPct,
    mrp: discountPct ? Math.round(t.price / (1 - discountPct / 100) / 10) * 10 : t.price,
    paramCount: t.parameters.length,
  };
});

export const getTestById = (id) => tests.find((x) => x.id === id);
