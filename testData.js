let obj = {
  status: true,
  data: {
    brand: 'Apple',
    phone_name: 'iPhone 13 Pro Max',
    thumbnail:
      'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg',
    phone_images: [
      'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-pro-max-01.jpg',
      'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-pro-max-1.jpg',
      'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-pro-max-2.jpg',
      'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-pro-max-3.jpg',
      'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-pro-max-4.jpg'
    ],
    release_date: 'Released 2021, September 24',
    dimension: '240g, 7.7mm thickness',
    os: 'iOS 15, up to iOS 15.1',
    storage: '128GB/256GB/1TB storage, no card slot',
    specifications: [
      {
        title: 'Network',
        specs: [
          {
            key: 'Technology',
            val: ['GSM / CDMA / HSPA / EVDO / LTE / 5G']
          },
          {
            key: '2G bands',
            val: [
              'GSM 850 / 900 / 1800 / 1900 - SIM 1 & SIM 2 (dual-SIM)',
              'CDMA 800 / 1900 '
            ]
          },
          {
            key: '3G bands',
            val: [
              'HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100 ',
              'CDMA2000 1xEV-DO '
            ]
          },
          {
            key: '4G bands',
            val: [
              '1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 66 - A2643, A2644, A2645',
              '1, 2, 3, 4, 5, 7, 8, 11, 12, 13, 14, 17, 18, 19, 20, 21, 25, 26, 28, 29, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 66, 71 - A2484, A2641'
            ]
          },
          {
            key: '5G bands',
            val: [
              '1, 2, 3, 5, 7, 8, 12, 20, 25, 28, 30, 38, 40, 41, 48, 66, 77, 78, 79 SA/NSA/Sub6 - A2643, A2644',
              '1, 2, 3, 5, 7, 8, 12, 20, 25, 28, 29, 30, 38, 40, 41, 48, 66, 71, 78, 79, 258, 260, 261 SA/NSA/Sub6/mmWave - A2484',
              '1, 2, 3, 5, 7, 8, 12, 20, 25, 28, 29, 30, 38, 40, 41, 48, 66, 71, 77, 78, 79 SA/NSA/Sub6 - A2641'
            ]
          },
          {
            key: 'Speed',
            val: ['HSPA 42.2/5.76 Mbps, LTE-A, 5G, EV-DO Rev.A 3.1 Mbps']
          }
        ]
      },
      {
        title: 'Launch',
        specs: [
          {
            key: 'Announced',
            val: ['2021, September 14']
          },
          {
            key: 'Status',
            val: ['Available. Released 2021, September 24']
          }
        ]
      },
      {
        title: 'Body',
        specs: [
          {
            key: 'Dimensions',
            val: ['160.8 x 78.1 x 7.7 mm (6.33 x 3.07 x 0.30 in)']
          },
          {
            key: 'Weight',
            val: ['240 g (8.47 oz)']
          },
          {
            key: 'Build',
            val: [
              'Glass front (Gorilla Glass), glass back (Gorilla Glass), stainless steel frame'
            ]
          },
          {
            key: 'SIM',
            val: [
              'Single SIM (Nano-SIM and/or eSIM) or Dual SIM (Nano-SIM/eSIM, dual stand-by)'
            ]
          },
          {
            key: 'Other',
            val: [
              'IP68 dust/water resistant (up to 6m for 30 mins) Apple Pay (Visa, MasterCard, AMEX certified)'
            ]
          }
        ]
      },
      {
        title: 'Display',
        specs: [
          {
            key: 'Type',
            val: [
              'Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision, 1000 nits (HBM), 1200 nits (peak)'
            ]
          },
          {
            key: 'Size',
            val: ['6.7 inches, 109.8 cm2 (~87.4% screen-to-body ratio)']
          },
          {
            key: 'Resolution',
            val: ['1284 x 2778 pixels, 19.5:9 ratio (~458 ppi density)']
          },
          {
            key: 'Protection',
            val: ['Scratch-resistant ceramic glass, oleophobic coating']
          },
          {
            key: 'Other',
            val: ['Wide color gamut True-tone']
          }
        ]
      },
      {
        title: 'Platform',
        specs: [
          {
            key: 'OS',
            val: ['iOS 15, upgradable to iOS 15.1']
          },
          {
            key: 'Chipset',
            val: ['Apple A15 Bionic (5 nm)']
          },
          {
            key: 'CPU',
            val: ['Hexa-core (2x3.22 GHz Avalanche + 4xX.X GHz Blizzard)']
          },
          {
            key: 'GPU',
            val: ['Apple GPU (5-core graphics)']
          }
        ]
      },
      {
        title: 'Memory',
        specs: [
          {
            key: 'Card slot',
            val: ['No']
          },
          {
            key: 'Internal',
            val: ['128GB 6GB RAM, 256GB 6GB RAM, 512GB 6GB RAM, 1TB 6GB RAM']
          },
          {
            key: 'Other',
            val: ['NVMe']
          }
        ]
      },
      {
        title: 'Main Camera',
        specs: [
          {
            key: 'Quad',
            val: [
              '12 MP, f/1.5, 26mm (wide), 1.9µm, dual pixel PDAF, sensor-shift OIS 12 MP, f/2.8, 77mm (telephoto), PDAF, OIS, 3x optical zoom 12 MP, f/1.8, 13mm, 120˚ (ultrawide), PDAF TOF 3D LiDAR scanner (depth)'
            ]
          },
          {
            key: 'Features',
            val: ['Dual-LED dual-tone flash, HDR (photo/panorama)']
          },
          {
            key: 'Video',
            val: [
              '4K@24/30/60fps, 1080p@30/60/120/240fps, 10‑bit HDR, Dolby Vision HDR (up to 60fps), ProRes, Cinematic mode, stereo sound rec.'
            ]
          }
        ]
      },
      {
        title: 'Selfie camera',
        specs: [
          {
            key: 'Dual',
            val: [
              '12 MP, f/2.2, 23mm (wide), 1/3.6',
              'SL 3D, (depth/biometrics sensor)'
            ]
          },
          {
            key: 'Features',
            val: ['HDR']
          },
          {
            key: 'Video',
            val: ['4K@24/25/30/60fps, 1080p@30/60/120fps, gyro-EIS']
          }
        ]
      },
      {
        title: 'Sound',
        specs: [
          {
            key: 'Loudspeaker',
            val: ['Yes, with stereo speakers']
          },
          {
            key: '3.5mm jack',
            val: ['No']
          }
        ]
      },
      {
        title: 'Comms',
        specs: [
          {
            key: 'WLAN',
            val: ['Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot']
          },
          {
            key: 'Bluetooth',
            val: ['5.0, A2DP, LE']
          },
          {
            key: 'GPS',
            val: ['Yes, with A-GPS, GLONASS, GALILEO, BDS, QZSS']
          },
          {
            key: 'NFC',
            val: ['Yes']
          },
          {
            key: 'Radio',
            val: ['No']
          },
          {
            key: 'USB',
            val: ['Lightning, USB 2.0']
          }
        ]
      },
      {
        title: 'Features',
        specs: [
          {
            key: 'Sensors',
            val: ['Face ID, accelerometer, gyro, proximity, compass, barometer']
          },
          {
            key: 'Other',
            val: [
              'Siri natural language commands and dictation Ultra Wideband (UWB) support'
            ]
          }
        ]
      },
      {
        title: 'Battery',
        specs: [
          {
            key: 'Type',
            val: ['Li-Ion 4352 mAh, non-removable (16.75 Wh)']
          },
          {
            key: 'Charging',
            val: [
              'Fast charging (27W, unofficial rating), 50% in 30 min (advertised), USB Power Delivery 2.0, MagSafe wireless charging 15W, Qi magnetic fast wireless charging 7.5W'
            ]
          }
        ]
      },
      {
        title: 'Misc',
        specs: [
          {
            key: 'Colors',
            val: ['Graphite, Gold, Silver, Sierra Blue']
          },
          {
            key: 'Models',
            val: ['A2643, A2484, A2641, A2644, A2645, iphone14,3']
          },
          {
            key: 'SAR',
            val: ['1.18 W/kg (head)     1.20 W/kg (body)     ']
          },
          {
            key: 'SAR EU',
            val: ['0.99 W/kg (head)     0.98 W/kg (body)     ']
          },
          {
            key: 'Price',
            val: [
              '$ 1,099.00 / £ 1,049.00 / € 1,337.37 / ₹ 129,900 / Rp 23,681,736'
            ]
          }
        ]
      },
      {
        title: 'Tests',
        specs: [
          {
            key: 'Performance',
            val: [
              'AnTuTu: 801691 (v9)',
              'GeekBench: 4706 (v5.1)',
              'GFXBench: 60fps (ES 3.1 onscreen)'
            ]
          },
          {
            key: 'Display',
            val: ['Contrast ratio: Infinite (nominal)']
          },
          {
            key: 'Camera',
            val: ['Photo / Video']
          },
          {
            key: 'Loudspeaker',
            val: ['-24.0 LUFS (Very good)']
          },
          {
            key: 'Battery life',
            val: ['Endurance rating 121h']
          },
          {
            key: 'Other',
            val: ['']
          }
        ]
      }
    ]
  }
}
