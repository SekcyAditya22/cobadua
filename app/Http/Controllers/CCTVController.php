<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CCTVController extends Controller
{
    private function getCCTVPackages()
    {
        return [
            // DAHUA CCTV Packages
            1 => [
                'id' => 1,
                'title' => 'DAHUA 2 Kamera',
                'price' => 'Rp 2.100.000',
                'period' => 'paket lengkap',
                'cameras' => 2,
                'brand' => 'DAHUA',
                'image' => '/images/cctv/dahua.png',
                'features' => [
                    '2 Kamera Indoor/Outdoor',
                    'DVR 4 Channel + adaptor',
                    'HDD 500GB (bisa request)',
                    'Power Supply',
                    'Kabel Coaxial Rg59 + power',
                    '5m Kabel UTP / LAN',
                    'Konektor BNC dan DC',
                    '2 Pelindung Kabel / Duck Cabel',
                    'FREE: Mouse & Kabel HDMI/RCA',
                    'Monitoring On TV dan HP'
                ],
                'description' => 'Paket CCTV DAHUA 2 kamera dengan kualitas terpercaya untuk keamanan rumah atau kantor kecil. Dilengkapi dengan DVR 4 channel dan aksesoris lengkap.',
                'specifications' => [
                    'resolution' => 'Full HD 1080p',
                    'storage' => 'HDD 500GB',
                    'nightVision' => 'Infrared Night Vision',
                    'warranty' => '1 Tahun',
                    'installation' => 'Paket komplit pasang, juga sudah termasuk pendukung lainnya'
                ],
                'images' => [
                    '/images/cctv/dahua.png',
                    '/images/cctv/dvr_dahua.png',
                    '/images/cctv/kabel.png',
                    '/images/cctv/power_supply.png'
                ],
                'badge' => 'DAHUA',
                'badgeColor' => 'from-red-400 to-red-600',
                'isPopular' => false,
                'gradient' => false,
            ],
            2 => [
                'id' => 2,
                'title' => 'DAHUA 4 Kamera',
                'price' => 'Rp 2.750.000',
                'period' => 'paket lengkap',
                'cameras' => 4,
                'brand' => 'DAHUA',
                'features' => [
                    '4 Kamera Indoor/Outdoor',
                    'DVR 4 Channel + adaptor',
                    'HDD 1TB (bisa request)',
                    'Power Supply',
                    'Kabel Coaxial Rg59 + Power',
                    '5m Kabel UTP / LAN',
                    'Konektor BNC dan DC',
                    '4 Pelindung Kabel / Duck Cabel',
                    'FREE: Mouse & Kabel HDMI/RCA',
                    'Monitoring On TV dan HP'
                ],
                'description' => 'Paket CCTV DAHUA 4 kamera ideal untuk rumah menengah atau kantor kecil. Dilengkapi dengan DVR 4 channel dan storage 1TB untuk rekaman yang lebih lama.',
                'specifications' => [
                    'resolution' => 'Full HD 1080p',
                    'storage' => 'HDD 1TB',
                    'nightVision' => 'Infrared Night Vision',
                    'warranty' => '1 Tahun',
                    'installation' => 'Paket komplit pasang, juga sudah termasuk pendukung lainnya'
                ],
                'images' => [
                    '/images/cctv/dahua.png',
                    '/images/cctv/dvr_dahua.png',
                    '/images/cctv/kabel.png',
                    '/images/cctv/power_supply.png'
                ],
                'badge' => 'DAHUA',
                'badgeColor' => 'from-red-400 to-red-600',
                'isPopular' => false,
                'gradient' => false,
            ],
            3 => [
                'id' => 3,
                'title' => 'DAHUA 6 Kamera',
                'price' => 'Rp 3.880.000',
                'period' => 'paket lengkap',
                'cameras' => 6,
                'brand' => 'DAHUA',
                'features' => [
                    '6 Kamera Indoor/Outdoor',
                    'DVR 8 Channel + adaptor',
                    'HDD 1TB (bisa request)',
                    'Power Supply',
                    'Kabel Coaxial Rg59 + power',
                    '5m Kabel UTP / LAN',
                    'Konektor BNC dan DC',
                    '6 Pelindung Kabel / Duck Cabel',
                    'FREE: Mouse & Kabel HDMI/RCA',
                    'Monitoring On TV dan HP'
                ],
                'description' => 'Paket CCTV DAHUA 6 kamera untuk coverage area yang lebih luas. Ideal untuk rumah besar atau kantor menengah dengan DVR 8 channel.',
                'specifications' => [
                    'resolution' => 'Full HD 1080p',
                    'storage' => 'HDD 1TB',
                    'nightVision' => 'Infrared Night Vision',
                    'warranty' => '1 Tahun',
                    'installation' => 'Paket komplit pasang, juga sudah termasuk pendukung lainnya'
                ],
                'images' => [
                    '/images/cctv/dahua.png',
                    '/images/cctv/dvr_dahua.png',
                    '/images/cctv/kabel.png',
                    '/images/cctv/power_supply.png'
                ],
                'badge' => 'DAHUA',
                'badgeColor' => 'from-red-400 to-red-600',

                'isPopular' => false,
                'gradient' => false,
            ],
            4 => [
                'id' => 4,
                'title' => 'DAHUA 8 Kamera',
                'price' => 'Rp 4.620.000',
                'period' => 'paket lengkap',
                'cameras' => 8,
                'brand' => 'DAHUA',
                'features' => [
                    '8 Kamera Indoor/Outdoor',
                    'DVR 8 Channel + adaptor',
                    'HDD 2TB (bisa request)',
                    'Power Supply',
                    'Kabel Coaxial Rg59 + power',
                    '5m Kabel UTP / LAN',
                    'Konektor BNC dan DC',
                    '8 Pelindung Kabel / Duck Cabel',
                    'FREE: Mouse & Kabel HDMI/RCA',
                    'Monitoring On TV dan HP'
                ],
                'description' => 'Paket CCTV DAHUA 8 kamera untuk keamanan maksimal. Cocok untuk bisnis menengah atau rumah besar dengan storage 2TB untuk rekaman jangka panjang.',
                'specifications' => [
                    'resolution' => 'Full HD 1080p',
                    'storage' => 'HDD 2TB',
                    'nightVision' => 'Infrared Night Vision',
                    'warranty' => '1 Tahun',
                    'installation' => 'Paket komplit pasang, juga sudah termasuk pendukung lainnya'
                ],
                'images' => [
                    '/images/cctv/dahua.png',
                    '/images/cctv/dvr_dahua.png',
                    '/images/cctv/kabel.png',
                    '/images/cctv/power_supply.png'
                ],
                'badge' => 'DAHUA',
                'badgeColor' => 'from-red-400 to-red-600',

                'isPopular' => false,
                'gradient' => false,
            ],
            // HILOOK CCTV Packages
            5 => [
                'id' => 5,
                'title' => 'HILOOK 2 Kamera',
                'price' => 'Rp 2.120.000',
                'period' => 'paket lengkap',
                'cameras' => 2,
                'brand' => 'HILOOK',
                'features' => [
                    '2 Kamera Indoor/Outdoor',
                    'DVR 4 Channel + adaptor',
                    'HDD 500GB (bisa request)',
                    'Power Supply',
                    'Kabel Coaxial Rg59 + power',
                    '5m Kabel UTP / LAN',
                    'Konektor BNC dan DC',
                    '2 Pelindung Kabel / Duck Cabel',
                    'FREE: Mouse & Kabel HDMI/RCA',
                    'Monitoring On TV dan HP'
                ],
                'description' => 'Paket CCTV HILOOK by HIKVISION 2 kamera dengan teknologi terdepan. Kualitas gambar jernih dan sistem yang handal untuk keamanan rumah.',
                'specifications' => [
                    'resolution' => 'Full HD 1080p',
                    'storage' => 'HDD 500GB',
                    'nightVision' => 'Infrared Night Vision',
                    'warranty' => '1 Tahun',
                    'installation' => 'Paket komplit pasang, juga sudah termasuk pendukung lainnya'
                ],
                'images' => [
                    '/images/cctv/hilook.png',
                    '/images/cctv/dvr_hilook.png',
                    '/images/cctv/kabel.png',
                    '/images/cctv/power_supply.png'
                ],
                'badge' => 'HILOOK',
                'badgeColor' => 'from-blue-400 to-blue-600',

                'isPopular' => false,
                'gradient' => false,
            ],
            6 => [
                'id' => 6,
                'title' => 'HILOOK 4 Kamera',
                'price' => 'Rp 2.770.000',
                'period' => 'paket lengkap',
                'cameras' => 4,
                'brand' => 'HILOOK',
                'features' => [
                    '4 Kamera Indoor/Outdoor',
                    'DVR 4 Channel + adaptor',
                    'HDD 1TB (bisa request)',
                    'Power Supply',
                    'Kabel Coaxial Rg59 + Power',
                    '5m Kabel UTP / LAN',
                    'Konektor BNC dan DC',
                    '4 Pelindung Kabel / Duck Cabel',
                    'FREE: Mouse & Kabel HDMI/RCA',
                    'Monitoring On TV dan HP'
                ],
                'description' => 'Paket CCTV HILOOK by HIKVISION 4 kamera dengan performa tinggi. Ideal untuk rumah menengah dengan teknologi HIKVISION yang terpercaya.',
                'specifications' => [
                    'resolution' => 'Full HD 1080p',
                    'storage' => 'HDD 1TB',
                    'nightVision' => 'Infrared Night Vision',
                    'warranty' => '1 Tahun',
                    'installation' => 'Paket komplit pasang, juga sudah termasuk pendukung lainnya'
                ],
                'images' => [
                    '/images/cctv/hilook.png',
                    '/images/cctv/dvr_hilook.png',
                    '/images/cctv/kabel.png',
                    '/images/cctv/power_supply.png'
                ],
                'badge' => 'HILOOK',
                'badgeColor' => 'from-blue-400 to-blue-600',

                'isPopular' => true,
                'gradient' => false,
            ],
            7 => [
                'id' => 7,
                'title' => 'HILOOK 6 Kamera',
                'price' => 'Rp 3.935.000',
                'period' => 'paket lengkap',
                'cameras' => 6,
                'brand' => 'HILOOK',
                'features' => [
                    '6 Kamera Indoor/Outdoor',
                    'DVR 8 Channel + adaptor',
                    'HDD 1TB (bisa request)',
                    'Power Supply',
                    'Kabel Coaxial Rg59 + power',
                    '5m Kabel UTP / LAN',
                    'Konektor BNC dan DC',
                    '6 Pelindung Kabel / Duck Cabel',
                    'FREE: Mouse & Kabel HDMI/RCA',
                    'Monitoring On TV dan HP'
                ],
                'description' => 'Paket CCTV HILOOK by HIKVISION 6 kamera untuk coverage area yang lebih luas. Teknologi HIKVISION dengan harga terjangkau.',
                'specifications' => [
                    'resolution' => 'Full HD 1080p',
                    'storage' => 'HDD 1TB',
                    'nightVision' => 'Infrared Night Vision',
                    'warranty' => '1 Tahun',
                    'installation' => 'Paket komplit pasang, juga sudah termasuk pendukung lainnya'
                ],
                'images' => [
                    '/images/cctv/hilook.png',
                    '/images/cctv/dvr_hilook.png',
                    '/images/cctv/kabel.png',
                    '/images/cctv/power_supply.png'
                ],
                'badge' => 'HILOOK',
                'badgeColor' => 'from-blue-400 to-blue-600',

                'isPopular' => false,
                'gradient' => false,
            ],
            8 => [
                'id' => 8,
                'title' => 'HILOOK 8 Kamera',
                'price' => 'Rp 4.850.000',
                'period' => 'paket lengkap',
                'cameras' => 8,
                'brand' => 'HILOOK',
                'features' => [
                    '8 Kamera Indoor/Outdoor',
                    'DVR 8 Channel + adaptor',
                    'HDD 2TB (bisa request)',
                    'Power Supply',
                    'Kabel Coaxial Rg59 + power',
                    '5m Kabel UTP / LAN',
                    'Konektor BNC dan DC',
                    '8 Pelindung Kabel / Duck Cabel',
                    'FREE: Mouse & Kabel HDMI/RCA',
                    'Monitoring On TV dan HP'
                ],
                'description' => 'Paket CCTV HILOOK by HIKVISION 8 kamera untuk keamanan maksimal. Dilengkapi storage 2TB dan teknologi HIKVISION yang handal.',
                'specifications' => [
                    'resolution' => 'Full HD 1080p',
                    'storage' => 'HDD 2TB',
                    'nightVision' => 'Infrared Night Vision',
                    'warranty' => '1 Tahun',
                    'installation' => 'Paket komplit pasang, juga sudah termasuk pendukung lainnya'
                ],
                'images' => [
                    '/images/cctv/hilook.png',
                    '/images/cctv/dvr_hilook.png',
                    '/images/cctv/kabel.png',
                    '/images/cctv/power_supply.png'
                ],
                'badge' => 'HILOOK',
                'badgeColor' => 'from-blue-400 to-blue-600',

                'isPopular' => false,
                'gradient' => false,
            ],
            // HILOOK Additional Packages
            13 => [
                'id' => 13,
                'title' => 'HILOOK 12 Kamera',
                'price' => 'Rp 7.320.000',
                'period' => 'paket lengkap',
                'cameras' => 12,
                'brand' => 'HILOOK',
                'features' => [
                    '12 Kamera Indoor/Outdoor',
                    'DVR 16 Channel + adaptor',
                    'HDD 2TB (bisa request)',
                    'Power Supply',
                    '300m Kabel Coaxial Rg59 + Power',
                    '5m Kabel UTP / LAN',
                    'Konektor BNC dan DC',
                    '12 Pelindung Kabel / Duck Cabel',
                    'FREE: Mouse & Kabel HDMI/RCA',
                    'Monitoring On TV dan HP'
                ],
                'description' => 'Paket CCTV HILOOK by HIKVISION 12 kamera untuk coverage area yang sangat luas. Ideal untuk bisnis besar atau kompleks dengan DVR 16 channel.',
                'specifications' => [
                    'resolution' => 'Full HD 1080p',
                    'storage' => 'HDD 2TB',
                    'nightVision' => 'Infrared Night Vision',
                    'warranty' => '1 Tahun',
                    'installation' => 'Paket komplit pasang, juga sudah termasuk pendukung lainnya'
                ],
                'images' => [
                    '/images/cctv/hilook.png',
                    '/images/cctv/dvr_hilook.png',
                    '/images/cctv/kabel.png',
                    '/images/cctv/power_supply.png'
                ],
                'badge' => 'HILOOK',
                'badgeColor' => 'from-blue-400 to-blue-600',

                'isPopular' => false,
                'gradient' => false,
            ],
            14 => [
                'id' => 14,
                'title' => 'HILOOK 16 Kamera',
                'price' => 'Rp 9.350.000',
                'period' => 'paket lengkap',
                'cameras' => 16,
                'brand' => 'HILOOK',
                'features' => [
                    '16 Kamera Indoor/Outdoor',
                    'DVR 16 Channel + adaptor',
                    'HDD 2TB (bisa request)',
                    'Power Supply',
                    '360m Kabel Coaxial Rg59 + Power',
                    '5m Kabel UTP / LAN',
                    'Konektor BNC dan DC',
                    '16 Pelindung Kabel / Duck Cabel',
                    'FREE: Mouse & Kabel HDMI/RCA',
                    'Monitoring On TV dan HP'
                ],
                'description' => 'Paket CCTV HILOOK by HIKVISION 16 kamera untuk keamanan enterprise. Solusi lengkap dengan 16 kamera dan kabel extra panjang untuk instalasi kompleks.',
                'specifications' => [
                    'resolution' => 'Full HD 1080p',
                    'storage' => 'HDD 2TB',
                    'nightVision' => 'Infrared Night Vision',
                    'warranty' => '1 Tahun',
                    'installation' => 'Paket komplit pasang, juga sudah termasuk pendukung lainnya'
                ],
                'images' => [
                    '/images/cctv/hilook.png',
                    '/images/cctv/dvr_hilook.png',
                    '/images/cctv/kabel.png',
                    '/images/cctv/power_supply.png'
                ],
                'badge' => 'HILOOK',
                'badgeColor' => 'from-blue-400 to-blue-600',

                'isPopular' => true,
                'gradient' => false,
            ],
            // HIKVISION CCTV Packages
            9 => [
                'id' => 9,
                'title' => 'HIKVISION 2 Kamera',
                'price' => 'Rp 2.525.000',
                'period' => 'paket lengkap',
                'cameras' => 2,
                'brand' => 'HIKVISION',
                'features' => [
                    '2 Kamera Indoor/Outdoor',
                    'DVR 4 Channel + adaptor',
                    'HDD 500GB (bisa request)',
                    'Power Supply',
                    '60m Kabel Coaxial Rg59 + power',
                    '5m Kabel UTP / LAN',
                    'Konektor BNC dan DC',
                    'Pelindung Kabel / Duck Cabel',
                    'FREE: Mouse & Kabel HDMI/RCA',
                    'Monitoring On TV dan HP'
                ],
                'description' => 'Paket CCTV HIKVISION 2 kamera dengan kualitas premium dan teknologi terdepan. Brand terpercaya dunia untuk keamanan profesional.',
                'specifications' => [
                    'resolution' => 'Full HD 1080p',
                    'storage' => 'HDD 500GB',
                    'nightVision' => 'Infrared Night Vision',
                    'warranty' => '1 Tahun',
                    'installation' => 'Paket komplit pasang, juga sudah termasuk pendukung lainnya'
                ],
                'images' => [
                    '/images/cctv/hikvision.png',
                    '/images/cctv/dvr_hikvision.png',
                    '/images/cctv/kabel.png',
                    '/images/cctv/power_supply.png'
                ],
                'badge' => 'HIKVISION',
                'badgeColor' => 'from-green-400 to-green-600',

                'isPopular' => false,
                'gradient' => false,
            ],
            10 => [
                'id' => 10,
                'title' => 'HIKVISION 4 Kamera',
                'price' => 'Rp 3.520.000',
                'period' => 'paket lengkap',
                'cameras' => 4,
                'brand' => 'HIKVISION',
                'features' => [
                    '4 Kamera Indoor/Outdoor',
                    'DVR 4 Channel + adaptor',
                    'HDD 1TB (bisa request)',
                    'Power Supply',
                    '120m Kabel Coaxial Rg59 + Power',
                    '5m Kabel UTP / LAN',
                    'Konektor BNC dan DC',
                    'Pelindung Kabel / Duck Cabel',
                    'FREE: Mouse & Kabel HDMI/RCA',
                    'Monitoring On TV dan HP'
                ],
                'description' => 'Paket CCTV HIKVISION 4 kamera dengan kualitas premium dan kabel yang lebih panjang. Teknologi terdepan untuk keamanan yang handal.',
                'specifications' => [
                    'resolution' => 'Full HD 1080p',
                    'storage' => 'HDD 1TB',
                    'nightVision' => 'Infrared Night Vision',
                    'warranty' => '1 Tahun',
                    'installation' => 'Paket komplit pasang, juga sudah termasuk pendukung lainnya'
                ],
                'images' => [
                    '/images/cctv/hikvision.png',
                    '/images/cctv/dvr_hikvision.png',
                    '/images/cctv/kabel.png',
                    '/images/cctv/power_supply.png'
                ],
                'badge' => 'HIKVISION',
                'badgeColor' => 'from-green-400 to-green-600',

                'isPopular' => false,
                'gradient' => false,
            ],
            11 => [
                'id' => 11,
                'title' => 'HIKVISION 6 Kamera',
                'price' => 'Rp 5.290.000',
                'period' => 'paket lengkap',
                'cameras' => 6,
                'brand' => 'HIKVISION',
                'features' => [
                    '6 Kamera Indoor/Outdoor',
                    'DVR 8 Channel + adaptor',
                    'HDD 1TB (bisa request)',
                    'Power Supply',
                    '180m Kabel Coaxial Rg59 + power',
                    '5m Kabel UTP / LAN',
                    'Konektor BNC dan DC',
                    'Pelindung Kabel / Duck Cabel',
                    'FREE: Mouse & Kabel HDMI/RCA',
                    'Monitoring On TV dan HP'
                ],
                'description' => 'Paket CCTV HIKVISION 6 kamera dengan kabel extra panjang untuk coverage area yang luas. Kualitas premium dengan teknologi HIKVISION terdepan.',
                'specifications' => [
                    'resolution' => 'Full HD 1080p',
                    'storage' => 'HDD 1TB',
                    'nightVision' => 'Infrared Night Vision',
                    'warranty' => '1 Tahun',
                    'installation' => 'Paket komplit pasang, juga sudah termasuk pendukung lainnya'
                ],
                'images' => [
                    '/images/cctv/hikvision.png',
                    '/images/cctv/dvr_hikvision.png',
                    '/images/cctv/kabel.png',
                    '/images/cctv/power_supply.png'
                ],
                'badge' => 'HIKVISION',
                'badgeColor' => 'from-green-400 to-green-600',

                'isPopular' => false,
                'gradient' => false,
            ],
            12 => [
                'id' => 12,
                'title' => 'HIKVISION 8 Kamera',
                'price' => 'Rp 6.250.000',
                'period' => 'paket lengkap',
                'cameras' => 8,
                'brand' => 'HIKVISION',
                'features' => [
                    '8 Kamera Indoor/Outdoor',
                    'DVR 8 Channel + adaptor',
                    'HDD 2TB (bisa request)',
                    'Power Supply',
                    '240m Kabel Coaxial Rg59 + power',
                    '5m Kabel UTP / LAN',
                    'Konektor BNC dan DC',
                    '5 Pelindung Kabel / Duck Cabel',
                    'FREE: Mouse & Kabel HDMI/RCA',
                    'Monitoring On TV dan HP'
                ],
                'description' => 'Paket CCTV HIKVISION 8 kamera premium dengan kabel extra panjang dan storage 2TB. Solusi keamanan terbaik dengan teknologi HIKVISION terdepan.',
                'specifications' => [
                    'resolution' => 'Full HD 1080p',
                    'storage' => 'HDD 2TB',
                    'nightVision' => 'Infrared Night Vision',
                    'warranty' => '1 Tahun',
                    'installation' => 'Paket komplit pasang, juga sudah termasuk pendukung lainnya'
                ],
                'images' => [
                    '/images/cctv/hikvision.png',
                    '/images/cctv/dvr_hikvision.png',
                    '/images/cctv/kabel.png',
                    '/images/cctv/power_supply.png'
                ],
                'badge' => 'HIKVISION',
                'badgeColor' => 'from-green-400 to-green-600',

                'isPopular' => true,
                'gradient' => true,
            ],
            // HIKVISION Additional Packages
            15 => [
                'id' => 15,
                'title' => 'HIKVISION 12 Kamera',
                'price' => 'Rp 9.370.000',
                'period' => 'paket lengkap',
                'cameras' => 12,
                'brand' => 'HIKVISION',
                'features' => [
                    '12 Kamera Indoor/Outdoor',
                    'DVR 16 Channel + adaptor',
                    'HDD 2TB (bisa request)',
                    'Power Supply',
                    '300m Kabel Coaxial Rg59 + Power',
                    '5m Kabel UTP / LAN',
                    'Konektor BNC dan DC',
                    '12 Pelindung Kabel / Duck Cabel',
                    'FREE: Mouse & Kabel HDMI/RCA',
                    'Monitoring On TV dan HP'
                ],
                'description' => 'Paket CCTV HIKVISION 12 kamera premium untuk keamanan enterprise. Teknologi terdepan dengan DVR 16 channel dan kabel extra panjang.',
                'specifications' => [
                    'resolution' => 'Full HD 1080p',
                    'storage' => 'HDD 2TB',
                    'nightVision' => 'Infrared Night Vision',
                    'warranty' => '1 Tahun',
                    'installation' => 'Paket komplit pasang, juga sudah termasuk pendukung lainnya'
                ],
                'images' => [
                    '/images/cctv/hikvision.png',
                    '/images/cctv/dvr_hikvision.png',
                    '/images/cctv/kabel.png',
                    '/images/cctv/power_supply.png'
                ],
                'badge' => 'HIKVISION',
                'badgeColor' => 'from-green-400 to-green-600',

                'isPopular' => false,
                'gradient' => false,
            ],
            16 => [
                'id' => 16,
                'title' => 'HIKVISION 16 Kamera',
                'price' => 'Rp 11.850.000',
                'period' => 'paket lengkap',
                'cameras' => 16,
                'brand' => 'HIKVISION',
                'features' => [
                    '16 Kamera Indoor/Outdoor',
                    'DVR 16 Channel + adaptor',
                    'HDD 2TB (bisa request)',
                    'Power Supply',
                    '360m Kabel Coaxial Rg59 + Power',
                    '5m Kabel UTP / LAN',
                    'Konektor BNC dan DC',
                    '16 Pelindung Kabel / Duck Cabel',
                    'FREE: Mouse & Kabel HDMI/RCA',
                    'Monitoring On TV dan HP'
                ],
                'description' => 'Paket CCTV HIKVISION 16 kamera ultimate untuk keamanan tingkat enterprise. Solusi premium dengan teknologi HIKVISION terdepan dan coverage maksimal.',
                'specifications' => [
                    'resolution' => 'Full HD 1080p',
                    'storage' => 'HDD 2TB',
                    'nightVision' => 'Infrared Night Vision',
                    'warranty' => '1 Tahun',
                    'installation' => 'Paket komplit pasang, juga sudah termasuk pendukung lainnya'
                ],
                'images' => [
                    '/images/cctv/hikvision.png',
                    '/images/cctv/dvr_hikvision.png',
                    '/images/cctv/kabel.png',
                    '/images/cctv/power_supply.png'
                ],
                'badge' => 'HIKVISION',
                'badgeColor' => 'from-green-400 to-green-600',

                'isPopular' => true,
                'gradient' => true,
            ],
        ];
    }

    public function index()
    {
        $packages = $this->getCCTVPackages();

        // Transform data for packages page (remove unnecessary fields and add buttonText)
        $packagesForList = array_map(function($package) {
            return [
                'id' => $package['id'],
                'title' => $package['title'],
                'price' => $package['price'],
                'period' => $package['period'],
                'cameras' => $package['cameras'],
                'brand' => $package['brand'] ?? null,
                'features' => $package['features'],
                'buttonText' => 'Pilih Paket ' . ($package['brand'] ?? 'CCTV'),
                'isPopular' => $package['isPopular'] ?? false,
                'gradient' => $package['gradient'] ?? false,
                'badge' => $package['badge'] ?? null,
                'badgeColor' => $package['badgeColor'] ?? 'from-blue-400 to-blue-600',
            ];
        }, $packages);

        return Inertia::render('CCTVPackages', [
            'packages' => array_values($packagesForList)
        ]);
    }

    public function show($id)
    {
        $packages = $this->getCCTVPackages();
        $packageId = (int) $id;

        if (!isset($packages[$packageId])) {
            abort(404);
        }

        return Inertia::render('CCTVDetail', [
            'package' => $packages[$packageId]
        ]);
    }
}
