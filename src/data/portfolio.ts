import { VehicleMastered } from '../types';

export const MASTERED_VEHICLES: VehicleMastered[] = [
  {
    id: 'veh-01',
    make: 'BMW',
    model: '530d M Sport (G30)',
    year: 2021,
    category: 'luxury',
    scope: 'Rear Air-Suspension Strut Rebuild & DDE Module Telemetry Calibration',
    engineSpec: '3.0L Straight-6 TwinPower Turbo Diesel',
    turnaround: '24 Hours',
    replacedComponents: [
      'Continental OE Air Suspension Bellows',
      'Bilstein B4 Adaptive Dampers',
      'Bosch Nitrogen Pressure Sensor',
      'OE Lemförder Control Arm Bushes'
    ],
    customerSnippet: '“Authorized BMW service in Lucknow quoted 2.8 lakhs for complete strut swap. Hindustan Garage calibrated the electronic valve and replaced the OEM bellows in 24 hours at 40% of the cost with zero dashboard warnings.”',
    ownerCity: 'Civil Lines, Prayagraj',
    rating: 5.0,
    tag: 'GERMAN LUXURY',
    imageUrl: '/images/portfolio_bmw_530d.jpg'
  },
  {
    id: 'veh-02',
    make: 'Mercedes-Benz',
    model: 'E-Class E220d (W213)',
    year: 2020,
    category: 'luxury',
    scope: 'Cashless Body Booth Restoration: Quarter Panel & AMG Bumper Reconstruction',
    engineSpec: '2.0L OM654 Inline-4 Turbodiesel',
    turnaround: '48 Hours',
    replacedComponents: [
      'OE Magneti Marelli Multibeam Headlight Module',
      'Cromax High-Gloss Clearcoat (German Import)',
      'Subframe Laser Realignment',
      'Acoustic Front Fender Liner'
    ],
    customerSnippet: '“Hindustan Garage processed the cashless claim with ICICI Lombard within 3 hours. The spectrophotometer color match on the Selenite Grey metallic paint is indistinguishable from the factory finish.”',
    ownerCity: 'Tagore Town, Prayagraj',
    rating: 5.0,
    tag: 'CASHLESS BODY BOOTH',
    imageUrl: '/images/after_mercedes_quarter_panel.jpg'
  },
  {
    id: 'veh-03',
    make: 'Audi',
    model: 'Q7 45 TDI Quattro',
    year: 2019,
    category: 'luxury',
    scope: 'Adaptive Air Suspension Compressor Overhaul & 8-Speed ZF Transmission Flush',
    engineSpec: '3.0L V6 Turbocharged TDI',
    turnaround: '36 Hours',
    replacedComponents: [
      'Wabco High-Pressure Air Compressor Cylinder Ring',
      'ZF LifeguardFluid 8 Automatic Transmission Fluid',
      'Valve Block Solenoid O-Ring Kit',
      'OE Cabin Hepa Filtration Core'
    ],
    customerSnippet: '“Car had dropped to lowest bump stops overnight. The master technicians traced the leak to a micron fracture in the valve block. Flawless workmanship.”',
    ownerCity: 'Cantonment, Prayagraj',
    rating: 5.0,
    tag: 'QUATTRO 4X4',
    imageUrl: '/images/bay_03_suspension_alignment.jpg'
  },
  {
    id: 'veh-04',
    make: 'Land Rover',
    model: 'Defender 110 D300',
    year: 2022,
    category: 'luxury',
    scope: 'Dynamic Terrain Response Calibration & Off-Road Steering Rack Hardening',
    engineSpec: '3.0L Ingenium Twin-Turbo MHEV',
    turnaround: '28 Hours',
    replacedComponents: [
      'OE JLR Heavy Duty Tie Rod Assemblies',
      'Terrain Response Transfer Case Sensor',
      'Front Sway Bar Bushings (Polyurethane)',
      'Brembo Performance Carbon Ceramic Brake Pads'
    ],
    customerSnippet: '“Regularly drive through Prayagraj to Mirzapur rough terrains. The front-end clunk was diagnosed and cured with millimeter precision. Outstanding technical depth.”',
    ownerCity: 'Kareli, Prayagraj',
    rating: 5.0,
    tag: 'EXPEDITION CHASSIS',
    imageUrl: '/images/portfolio_defender_110.jpg'
  },
  {
    id: 'veh-05',
    make: 'Toyota',
    model: 'Fortuner 2.8 4x4 AT',
    year: 2021,
    category: 'luxury',
    scope: '4x4 Propeller Shaft Balancing, Complete Underbody Rust-Armor & AC Overhaul',
    engineSpec: '2.8L 1GD-FTV Turbo Diesel (500 Nm)',
    turnaround: '12 Hours',
    replacedComponents: [
      'Genuine Toyota Universal Cross Joints',
      'Dual-Zone Condenser Core Decontamination',
      'High-Temperature Ceramic Synthetic Brake Fluid',
      'Underchassis Rubberized Acoustic Barrier'
    ],
    customerSnippet: '“No vibration at 140 km/h on the Purvanchal Expressway now. Their 66 years of experience shows in the way they handle heavy chassis vehicles.”',
    ownerCity: 'George Town, Prayagraj',
    rating: 5.0,
    tag: 'HEAVY LADDER FRAME',
    imageUrl: '/images/portfolio_fortuner_4x4.jpg'
  },
  {
    id: 'veh-06',
    make: 'Hyundai',
    model: 'Creta 1.5 CRDi SX(O)',
    year: 2022,
    category: 'daily',
    scope: 'Panoramic Sunroof Track Restoration & Speed Parts Genuine Steering Coupler Swap',
    engineSpec: '1.5L U2 CRDi Diesel',
    turnaround: '4 Hours',
    replacedComponents: [
      'Speed Parts OEM Hyundai Panoramic Guide Track Alloy Slider',
      'Genuine Hyundai EPS Steering Flexible Coupling',
      'OE Front Lower Control Arm Assembly',
      'Cabin Micro-Air Filter'
    ],
    customerSnippet: '“Dealership wanted to replace the whole panoramic frame for ₹65,000 because of stuck glass. Hindustan Garage rebuilt the guide slider using Speed Parts genuine OEM parts in 4 hours for a fraction of the price.”',
    ownerCity: 'Allahpur, Prayagraj',
    rating: 5.0,
    tag: 'HYUNDAI SPECIALIST',
    imageUrl: '/images/portfolio_creta_sx.jpg'
  },
  {
    id: 'veh-07',
    make: 'Tata',
    model: 'Safari Dark Edition (Kryotec)',
    year: 2023,
    category: 'daily',
    scope: 'Hydraulic Clutch Cylinder Rebuild & Electronic Parking Brake (EPB) Recalibration',
    engineSpec: '2.0L Kryotec Turbocharged Diesel',
    turnaround: '6 Hours',
    replacedComponents: [
      'OE Valeo Concentric Slave Cylinder (CSC)',
      'EPB Actuator Motor Connector Wire Harness',
      'Motul 5W30 Fully Synthetic Engine Oil',
      'Bosch Dot 4 Brake & Clutch Hydraulic Fluid'
    ],
    customerSnippet: '“Clutch pedal had sunk to the floor at Subhash Chauraha. Hindustan Garage’s breakdown recovery picked the car up in 20 minutes and had it rolling the same evening.”',
    ownerCity: 'Katra, Prayagraj',
    rating: 5.0,
    tag: 'DOMESTIC MASTER'
  },
  {
    id: 'veh-08',
    make: 'Maruti Suzuki',
    model: 'Grand Vitara Hybrid Alpha+',
    year: 2023,
    category: 'daily',
    scope: 'High-Voltage Battery Cooling Loop Flush & 3D Wheel Alignment Tuning',
    engineSpec: '1.5L Intelligent Electric Hybrid',
    turnaround: '3 Hours',
    replacedComponents: [
      'Inverter Liquid Coolant (Ultra-Low Conductivity)',
      'Speed Parts Steering Tie Rod Ends',
      'OE Ceramic Brake Friction Pads',
      'Wheel Speed ABS Magnetic Sensor'
    ],
    customerSnippet: '“Very few garages in Prayagraj understand the electric hybrid drive cycle. These master technicians have modern computer tools and decades of mechanical mastery.”',
    ownerCity: 'Naini, Prayagraj',
    rating: 5.0,
    tag: 'HYBRID POWERTRAIN'
  },
  {
    id: 'veh-09',
    make: 'Mahindra',
    model: 'Scorpio-N Z8L 4XPLOR',
    year: 2023,
    category: 'daily',
    scope: 'Penta-Link Rear Suspension Damping Tune & Front Differential Fluid Service',
    engineSpec: '2.2L mHawk Turbocharged CRDe',
    turnaround: '5 Hours',
    replacedComponents: [
      'OE Frequency Dependent Damping Shocker Set',
      'Castrol 75W90 Synthetic Differential Oil',
      'Heavy-Duty Front Sway Bar Links',
      'Speed Parts Genuine Oil Filter Cartridge'
    ],
    customerSnippet: '“Body roll and thudding on road craters completely eliminated. The technician explained the telemetry damping graph before and after the repair.”',
    ownerCity: 'Phaphamau, Prayagraj',
    rating: 5.0,
    tag: 'TOUGH 4X4'
  },
  {
    id: 'veh-10',
    make: 'Honda',
    model: 'City 1.5 i-VTEC (5th Gen)',
    year: 2021,
    category: 'daily',
    scope: 'Throttle Body Ultrasonic De-Carbonization & AC Evaporator Deep Cleansing',
    engineSpec: '1.5L DOHC i-VTEC with VTC',
    turnaround: '3.5 Hours',
    replacedComponents: [
      'OE Denso Iridium Spark Plugs (Set of 4)',
      'Subzero HVAC Anti-Bacterial Foam Cleanser',
      'Speed Parts Poly-V Alternator Serpentine Belt',
      'Engine Air Intake Filtration Core'
    ],
    customerSnippet: '“My City is idling like a whisper again. Instant throttle response restored and chilled AC in peak Prayagraj summer. 10/10 service.”',
    ownerCity: 'Civil Lines, Prayagraj',
    rating: 5.0,
    tag: 'JAPANESE PRECISION'
  }
];
