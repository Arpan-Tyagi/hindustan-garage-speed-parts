import { DiagnosticBay } from '../types';

export const DIAGNOSTIC_BAYS: DiagnosticBay[] = [
  {
    id: 'bay-01',
    number: 'BAY 01',
    name: 'ECM & Digital System Diagnostics',
    hindiTag: 'ईसीएम एवं कंप्यूटर डायग्नोस्टिक्स',
    system: 'Powertrain, CAN-Bus & Sensor Network',
    description: 'Direct ECU/BCM telemetry interrogation using OE-grade scan tools. Rapid fault-code tracing, throttle calibration, injector coding, and DPF regeneration for BS6/Euro-6 powertrains.',
    tooling: [
      'Bosch KTS 590 Wireless Passthru',
      'Launch X-431 PAD VII Heavy-Duty Dual Mode',
      'Fluke 88V Automotive Digital Multimeter',
      'Autel MaxiSys Ultra Oscilloscope'
    ],
    capabilities: [
      'Real-time live sensor data streaming',
      'Key programming & immobilizer sync',
      'Airbag SRS module reset & validation',
      'Electric steering torque sensor recalibration'
    ],
    turnaround: '90 – 120 Mins',
    warranty: '6 Months Software Validation Guarantee',
    status: 'ONLINE',
    telemetryMetric: 'SCAN TOLERANCE',
    telemetryValue: '±0.01V / 0 DTCs',
    imageUrl: '/images/bay_01_ecm_diagnostics.jpg'
  },
  {
    id: 'bay-02',
    number: 'BAY 02',
    name: 'Power Steering & EPS Hydraulics',
    hindiTag: 'पावर स्टीयरिंग एवं हाइड्रोलिक रिपेयर',
    system: 'Rack & Pinion, Electric Column & Hydraulic Lines',
    description: 'Complete overhaul of electronic power steering (EPS) motors, torque sensors, steering column couplings, and high-pressure hydraulic steering pumps without replacing the entire expensive rack.',
    tooling: [
      'MTS Computerized EPS Simulation Rig',
      'High-Pressure Hydraulic Leak Detector',
      'Heavy Duty Bushing Extraction Mandrel',
      'Digital Laser Rack Play Caliper'
    ],
    capabilities: [
      'Elimination of EPS rattle on rough Prayagraj roads',
      'Hydraulic rack hard-chrome re-shafting',
      'Electronic torque sensor zero-point adaptation',
      'High-pressure hose crimping & oil flush'
    ],
    turnaround: '4 – 6 Hours',
    warranty: '12 Months Unlimited KM Warranty',
    status: 'ONLINE',
    telemetryMetric: 'AXIAL RACK PLAY',
    telemetryValue: '0.00 mm (True Zero)',
    imageUrl: '/images/bay_02_eps_steering.jpg'
  },
  {
    id: 'bay-03',
    number: 'BAY 03',
    name: 'Precision Shockers & Suspension',
    hindiTag: 'शॉकर एवं अंडरचेसिस सस्पेंशन',
    system: 'Independent MacPherson, Multi-Link & Dampers',
    description: 'End-to-end suspension geometry alignment, shock absorber rebuilds, link-rod replacement, and subframe bush pressing designed to withstand GT Road and Civil Lines high-frequency impacts.',
    tooling: [
      '30-Ton Hydraulic Shocker Assembly Press',
      'Corghi 3D Computerized Laser Wheel Aligner',
      'Dynamic Shocker Bounce Damping Bench',
      'High-Tensile Subframe Torque Keys'
    ],
    capabilities: [
      'Twin-tube gas shocker rejuvenation',
      'Hydraulic suspension bushing replacement',
      'Camber, caster & toe precision zeroing',
      'Control arm & ball joint dynamic stress test'
    ],
    turnaround: '3 – 5 Hours',
    warranty: '12 Months / 20,000 KM Warranty',
    status: 'ACTIVE_DIAGNOSTIC',
    telemetryMetric: 'DAMPING EFFICIENCY',
    telemetryValue: '99.4% Factory Match',
    imageUrl: '/images/bay_03_suspension_alignment.jpg'
  },
  {
    id: 'bay-04',
    number: 'BAY 04',
    name: 'Panoramic Sunroof & Weatherproofing',
    hindiTag: 'सनरूफ रिपेयर एवं वाटरप्रूफिंग',
    system: 'Dual-Pane Panoramic Mechanisms & Drain Channels',
    description: 'Dedicated clean-room station for panoramic sunroof track repair, guide rail replacement, motor synchronization, and ultrasonic unclogging of concealed A/B pillar drainage tubes to prevent cabin flooding.',
    tooling: [
      'Wurth Ultrasonic Water Drain Hydro-Jet',
      'Precision Sunroof Cable Tensioner',
      'German Synthetic Fluoropolymer Rail Lubricant',
      'Infrared Water Penetration Sensor'
    ],
    capabilities: [
      'Unclogging silted drain lines from Prayagraj dust',
      'Panoramic glass alignment & wind-noise damping',
      'Replacement of broken plastic guide shoes with alloy kits',
      'Weather-strip UV cure & seal rejuvenation'
    ],
    turnaround: '2 – 3 Hours',
    warranty: '100% Water Ingress Protection Guarantee',
    status: 'ONLINE',
    telemetryMetric: 'SEAL INTEGRITY',
    telemetryValue: 'IP67 Equivalent',
    imageUrl: '/images/bay_04_sunroof_cleanroom.jpg'
  },
  {
    id: 'bay-05',
    number: 'BAY 05',
    name: 'Radiator, Thermostat & Climate HVAC',
    hindiTag: 'रेडिएटर, कूलिंग सिस्टम एवं एसी',
    system: 'Thermal Dissipation & Multi-Zone Air Conditioning',
    description: 'Complete cooling loop decontamination and dual-gas AC servicing. Prevent engine overheating during Eastern UP’s 47°C summer heatwaves through vacuum leak tests and high-purity coolant flushes.',
    tooling: [
      'Robinair Dual Gas R134a/R1234yf AC Station',
      'Pneumatic Cooling System Vacuum Purger',
      'Digital Infrared Radiator Core Thermal Imager',
      'Chemical Ultrasonic Condenser Cleaner'
    ],
    capabilities: [
      'Radiator core descaling & aluminum tank crimping',
      'Thermostat valve electronic response calibration',
      'Evaporator core antibacterial chemical ozone wash',
      'Compressor magnetic clutch clearance adjustment'
    ],
    turnaround: '3 – 4 Hours',
    warranty: '12 Months Compressor Performance Warranty',
    status: 'ONLINE',
    telemetryMetric: 'CABIN DELTA T',
    telemetryValue: '-14.6°C within 4 Mins',
    imageUrl: '/images/bay_05_radiator_ac.jpg'
  },
  {
    id: 'bay-06',
    number: 'BAY 06',
    name: 'Cashless Paint Booth & Precision Body',
    hindiTag: 'कैशलेस डेंटिंग-पेंटिंग एवं बेकिंग बूथ',
    system: 'Chassis Alignment & 60°C Sealed Infrared Coating',
    description: 'State-of-the-art downdraft dust-free paint booth with computerized spectrophotometer color matching. Official cashless claim settlement facility for 18+ leading motor insurance companies.',
    tooling: [
      'Blowtherm Sealed Positive-Pressure Baking Booth',
      'BYK-Gardner Spectro-Guide Digital Color Matcher',
      'Car-O-Liner Chassis 3D Measuring Bench',
      'SATAjet X 5500 RP Precision Spray Guns'
    ],
    capabilities: [
      'Instant cashless survey approval with 18+ insurers',
      '60°C high-bake durable anti-scratch clearcoat',
      'Paintless Dent Removal (PDR) for minor door dings',
      'Underbody rust-resistant zinc phosphating'
    ],
    turnaround: '24 – 48 Hours',
    warranty: '3-Year Gloss & Anti-Peeling Warranty',
    status: 'ACTIVE_DIAGNOSTIC',
    telemetryMetric: 'BAKING CHAMBER',
    telemetryValue: '60°C Thermostatically Sealed',
    imageUrl: '/images/bay_06_paint_booth.jpg'
  }
];
