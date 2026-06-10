require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.db'));

// FIFA World Cup 2026 - Official Match Schedule (Chronological Order)
const groupMatches = [
  // Day 1 - Thursday, June 11, 2026
  { home_team: 'Mexico', home_team_ar: 'المكسيك', away_team: 'South Africa', away_team_ar: 'جنوب إفريقيا', stadium: 'Estadio Azteca', stadium_ar: 'ملعب أزتيكا', city: 'Mexico City', city_ar: 'مكسيكو سيتي', match_date: '2026-06-11T13:00' },

  // Day 2 - Friday, June 12, 2026
  { home_team: 'Canada', home_team_ar: 'كندا', away_team: 'Bosnia/Italy/Wales', away_team_ar: 'البوسنة/إيطاليا/ويلز', stadium: 'BMO Field', stadium_ar: 'ملعب تورونتو', city: 'Toronto', city_ar: 'تورونتو', match_date: '2026-06-12T15:00' },
  { home_team: 'South Korea', home_team_ar: 'كوريا الجنوبية', away_team: 'Czech Republic/Ireland', away_team_ar: 'التشيك/أيرلندا', stadium: 'Estadio Akron', stadium_ar: 'ملعب غوادالاخارا', city: 'Guadalajara', city_ar: 'غوادالاخارا', match_date: '2026-06-12T18:00' },

  // Day 3 - Saturday, June 13, 2026
  { home_team: 'Qatar', home_team_ar: 'قطر', away_team: 'Switzerland', away_team_ar: 'سويسرا', stadium: 'Gillette Stadium', stadium_ar: 'ملعب بوسطن', city: 'Foxborough', city_ar: 'فوكسبورو', match_date: '2026-06-13T15:00' },
  { home_team: 'USA', home_team_ar: 'الولايات المتحدة', away_team: 'Paraguay', away_team_ar: 'باراغواي', stadium: 'SoFi Stadium', stadium_ar: 'ملعب لوس أنجلوس', city: 'Inglewood', city_ar: 'إنجلوود', match_date: '2026-06-13T18:00' },

  // Day 4 - Sunday, June 14, 2026
  { home_team: 'Germany', home_team_ar: 'ألمانيا', away_team: 'Curacao', away_team_ar: 'كوراساو', stadium: 'MetLife Stadium', stadium_ar: 'ملعب نيويورك نيوجيرسي', city: 'East Rutherford', city_ar: 'أيست رذرفورد', match_date: '2026-06-14T14:00' },
  { home_team: 'Netherlands', home_team_ar: 'هولندا', away_team: 'Japan', away_team_ar: 'اليابان', stadium: 'Lincoln Financial Field', stadium_ar: 'ملعب فيلادلفيا', city: 'Philadelphia', city_ar: 'فيلادلفيا', match_date: '2026-06-14T14:00' },
  { home_team: 'Brazil', home_team_ar: 'البرازيل', away_team: 'Morocco', away_team_ar: 'المغرب', stadium: 'Lumen Field', stadium_ar: 'ملعب سياتل', city: 'Seattle', city_ar: 'سياتل', match_date: '2026-06-14T16:00' },
  { home_team: 'Haiti', home_team_ar: 'هايتي', away_team: 'Scotland', away_team_ar: 'إسكتلندا', stadium: 'Hard Rock Stadium', stadium_ar: 'ملعب ساوث فلوريدا', city: 'Miami Gardens', city_ar: 'ميامي غاردنز', match_date: '2026-06-14T17:00' },
  { home_team: 'Australia', home_team_ar: 'أستراليا', away_team: 'Turkey/Romania', away_team_ar: 'تركيا/رومانيا', stadium: 'NRG Stadium', stadium_ar: 'ملعب هيوستن', city: 'Houston', city_ar: 'هيوستن', match_date: '2026-06-14T18:00' },

  // Day 5 - Monday, June 15, 2026
  { home_team: 'Ivory Coast', home_team_ar: 'ساحل العاج', away_team: 'Ecuador', away_team_ar: 'الإكوادور', stadium: 'Arrowhead Stadium', stadium_ar: 'ملعب كانساس سيتي', city: 'Kansas City', city_ar: 'كانساس سيتي', match_date: '2026-06-15T17:00' },
  { home_team: 'Sweden/Poland', home_team_ar: 'السويد/بولندا', away_team: 'Tunisia', away_team_ar: 'تونس', stadium: 'AT&T Stadium', stadium_ar: 'ملعب دالاس', city: 'Arlington', city_ar: 'أرلينغتون', match_date: '2026-06-15T18:00' },
  { home_team: 'Spain', home_team_ar: 'إسبانيا', away_team: 'Cape Verde', away_team_ar: 'الرأس الأخضر', stadium: 'Estadio BBVA', stadium_ar: 'ملعب مونتيري', city: 'Guadalupe', city_ar: 'غوادالوبي', match_date: '2026-06-15T17:00' },
  { home_team: 'Belgium', home_team_ar: 'بلجيكا', away_team: 'Egypt', away_team_ar: 'مصر', stadium: 'Mercedes-Benz Stadium', stadium_ar: 'ملعب أتلانتا', city: 'Atlanta', city_ar: 'أتلانتا', match_date: '2026-06-15T17:00' },

  // Day 6 - Tuesday, June 16, 2026
  { home_team: 'France', home_team_ar: 'فرنسا', away_team: 'Senegal', away_team_ar: 'السنغال', stadium: 'Gillette Stadium', stadium_ar: 'ملعب بوسطن', city: 'Foxborough', city_ar: 'فوكسبورو', match_date: '2026-06-16T15:00' },
  { home_team: 'Saudi Arabia', home_team_ar: 'السعودية', away_team: 'Uruguay', away_team_ar: 'أوروغواي', stadium: 'SoFi Stadium', stadium_ar: 'ملعب لوس أنجلوس', city: 'Inglewood', city_ar: 'إنجلوود', match_date: '2026-06-16T18:00' },
  { home_team: 'Iran', home_team_ar: 'إيران', away_team: 'New Zealand', away_team_ar: 'نيوزيلندا', stadium: "Levi's Stadium", stadium_ar: 'ملعب منطقة خليج سان فرانسيسكو', city: 'Santa Clara', city_ar: 'سانتا كلارا', match_date: '2026-06-16T19:00' },

  // Day 7 - Wednesday, June 17, 2026
  { home_team: 'Argentina', home_team_ar: 'الأرجنتين', away_team: 'Algeria', away_team_ar: 'الجزائر', stadium: 'Lincoln Financial Field', stadium_ar: 'ملعب فيلادلفيا', city: 'Philadelphia', city_ar: 'فيلادلفيا', match_date: '2026-06-17T14:00' },
  { home_team: 'Iraq/Bolivia', home_team_ar: 'العراق/بوليفيا', away_team: 'Norway', away_team_ar: 'النرويج', stadium: 'MetLife Stadium', stadium_ar: 'ملعب نيويورك نيوجيرسي', city: 'East Rutherford', city_ar: 'أيست رذرفورد', match_date: '2026-06-17T15:00' },
  { home_team: 'Portugal', home_team_ar: 'البرتغال', away_team: 'DR Congo', away_team_ar: 'الكونغو الديمقراطية', stadium: 'BMO Field', stadium_ar: 'ملعب تورونتو', city: 'Toronto', city_ar: 'تورونتو', match_date: '2026-06-17T15:00' },
  { home_team: 'Austria', home_team_ar: 'النمسا', away_team: 'Jordan', away_team_ar: 'الأردن', stadium: 'Arrowhead Stadium', stadium_ar: 'ملعب كانساس سيتي', city: 'Kansas City', city_ar: 'كانساس سيتي', match_date: '2026-06-17T17:00' },

  // Day 8 - Thursday, June 18, 2026
  { home_team: 'South Africa', home_team_ar: 'جنوب إفريقيا', away_team: 'Czech Republic/Ireland', away_team_ar: 'التشيك/أيرلندا', stadium: 'Mercedes-Benz Stadium', stadium_ar: 'ملعب أتلانتا', city: 'Atlanta', city_ar: 'أتلانتا', match_date: '2026-06-18T17:00' },
  { home_team: 'Uzbekistan', home_team_ar: 'أوزبكستان', away_team: 'Colombia', away_team_ar: 'كولومبيا', stadium: 'AT&T Stadium', stadium_ar: 'ملعب دالاس', city: 'Arlington', city_ar: 'أرلينغتون', match_date: '2026-06-18T17:00' },
  { home_team: 'England', home_team_ar: 'إنجلترا', away_team: 'Croatia', away_team_ar: 'كرواتيا', stadium: 'NRG Stadium', stadium_ar: 'ملعب هيوستن', city: 'Houston', city_ar: 'هيوستن', match_date: '2026-06-18T18:00' },
  { home_team: 'Ghana', home_team_ar: 'غانا', away_team: 'Panama', away_team_ar: 'بنما', stadium: 'Lumen Field', stadium_ar: 'ملعب سياتل', city: 'Seattle', city_ar: 'سياتل', match_date: '2026-06-18T19:00' },

  // Day 9 - Friday, June 19, 2026
  { home_team: 'USA', home_team_ar: 'الولايات المتحدة', away_team: 'Australia', away_team_ar: 'أستراليا', stadium: 'MetLife Stadium', stadium_ar: 'ملعب نيويورك نيوجيرسي', city: 'East Rutherford', city_ar: 'أيست رذرفورد', match_date: '2026-06-19T15:00' },
  { home_team: 'Bosnia/Italy/Wales', home_team_ar: 'البوسنة/إيطاليا/ويلز', away_team: 'Switzerland', away_team_ar: 'سويسرا', stadium: 'Hard Rock Stadium', stadium_ar: 'ملعب ساوث فلوريدا', city: 'Miami Gardens', city_ar: 'ميامي غاردنز', match_date: '2026-06-19T17:00' },
  { home_team: 'Canada', home_team_ar: 'كندا', away_team: 'Qatar', away_team_ar: 'قطر', stadium: 'Estadio Azteca', stadium_ar: 'ملعب أزتيكا', city: 'Mexico City', city_ar: 'مكسيكو سيتي', match_date: '2026-06-19T18:00' },
  { home_team: 'Mexico', home_team_ar: 'المكسيك', away_team: 'South Korea', away_team_ar: 'كوريا الجنوبية', stadium: 'Lumen Field', stadium_ar: 'ملعب سياتل', city: 'Seattle', city_ar: 'سياتل', match_date: '2026-06-19T19:00' },

  // Day 10 - Saturday, June 20, 2026
  { home_team: 'Netherlands', home_team_ar: 'هولندا', away_team: 'Sweden/Poland', away_team_ar: 'السويد/بولندا', stadium: 'BMO Field', stadium_ar: 'ملعب تورونتو', city: 'Toronto', city_ar: 'تورونتو', match_date: '2026-06-20T14:00' },
  { home_team: 'Morocco', home_team_ar: 'المغرب', away_team: 'Scotland', away_team_ar: 'إسكتلندا', stadium: 'Gillette Stadium', stadium_ar: 'ملعب بوسطن', city: 'Foxborough', city_ar: 'فوكسبورو', match_date: '2026-06-20T15:00' },
  { home_team: 'Brazil', home_team_ar: 'البرازيل', away_team: 'Haiti', away_team_ar: 'هايتي', stadium: 'BC Place', stadium_ar: 'ملعب فانكوفر', city: 'Vancouver', city_ar: 'فانكوفر', match_date: '2026-06-20T16:00' },
  { home_team: 'Paraguay', home_team_ar: 'باراغواي', away_team: 'Turkey/Romania', away_team_ar: 'تركيا/رومانيا', stadium: "Levi's Stadium", stadium_ar: 'ملعب منطقة خليج سان فرانسيسكو', city: 'Santa Clara', city_ar: 'سانتا كلارا', match_date: '2026-06-20T19:00' },

  // Day 11 - Sunday, June 21, 2026
  { home_team: 'Belgium', home_team_ar: 'بلجيكا', away_team: 'Iran', away_team_ar: 'إيران', stadium: 'Mercedes-Benz Stadium', stadium_ar: 'ملعب أتلانتا', city: 'Atlanta', city_ar: 'أتلانتا', match_date: '2026-06-21T14:00' },
  { home_team: 'Germany', home_team_ar: 'ألمانيا', away_team: 'Ivory Coast', away_team_ar: 'ساحل العاج', stadium: 'Lincoln Financial Field', stadium_ar: 'ملعب فيلادلفيا', city: 'Philadelphia', city_ar: 'فيلادلفيا', match_date: '2026-06-21T15:00' },
  { home_team: 'Curacao', home_team_ar: 'كوراساو', away_team: 'Ecuador', away_team_ar: 'الإكوادور', stadium: 'NRG Stadium', stadium_ar: 'ملعب هيوستن', city: 'Houston', city_ar: 'هيوستن', match_date: '2026-06-21T17:00' },
  { home_team: 'Japan', home_team_ar: 'اليابان', away_team: 'Tunisia', away_team_ar: 'تونس', stadium: 'Estadio Akron', stadium_ar: 'ملعب غوادالاخارا', city: 'Guadalajara', city_ar: 'غوادالاخارا', match_date: '2026-06-21T18:00' },

  // Day 12 - Monday, June 22, 2026
  { home_team: 'Spain', home_team_ar: 'إسبانيا', away_team: 'Saudi Arabia', away_team_ar: 'السعودية', stadium: 'Hard Rock Stadium', stadium_ar: 'ملعب ساوث فلوريدا', city: 'Miami Gardens', city_ar: 'ميامي غاردنز', match_date: '2026-06-22T14:00' },
  { home_team: 'France', home_team_ar: 'فرنسا', away_team: 'Iraq/Bolivia', away_team_ar: 'العراق/بوليفيا', stadium: 'MetLife Stadium', stadium_ar: 'ملعب نيويورك نيوجيرسي', city: 'East Rutherford', city_ar: 'أيست رذرفورد', match_date: '2026-06-22T15:00' },
  { home_team: 'Cape Verde', home_team_ar: 'الرأس الأخضر', away_team: 'Uruguay', away_team_ar: 'أوروغواي', stadium: 'AT&T Stadium', stadium_ar: 'ملعب دالاس', city: 'Arlington', city_ar: 'أرلينغتون', match_date: '2026-06-22T17:00' },
  { home_team: 'Egypt', home_team_ar: 'مصر', away_team: 'New Zealand', away_team_ar: 'نيوزيلندا', stadium: 'SoFi Stadium', stadium_ar: 'ملعب لوس أنجلوس', city: 'Inglewood', city_ar: 'إنجلوود', match_date: '2026-06-22T18:00' },

  // Day 13 - Tuesday, June 23, 2026
  { home_team: 'Portugal', home_team_ar: 'البرتغال', away_team: 'Uzbekistan', away_team_ar: 'أوزبكستان', stadium: 'Gillette Stadium', stadium_ar: 'ملعب بوسطن', city: 'Foxborough', city_ar: 'فوكسبورو', match_date: '2026-06-23T15:00' },
  { home_team: 'Senegal', home_team_ar: 'السنغال', away_team: 'Norway', away_team_ar: 'النرويج', stadium: 'Lincoln Financial Field', stadium_ar: 'ملعب فيلادلفيا', city: 'Philadelphia', city_ar: 'فيلادلفيا', match_date: '2026-06-23T15:00' },
  { home_team: 'Argentina', home_team_ar: 'الأرجنتين', away_team: 'Austria', away_team_ar: 'النمسا', stadium: 'Estadio BBVA', stadium_ar: 'ملعب مونتيري', city: 'Guadalupe', city_ar: 'غوادالوبي', match_date: '2026-06-23T17:00' },
  { home_team: 'Algeria', home_team_ar: 'الجزائر', away_team: 'Jordan', away_team_ar: 'الأردن', stadium: "Levi's Stadium", stadium_ar: 'ملعب منطقة خليج سان فرانسيسكو', city: 'Santa Clara', city_ar: 'سانتا كلارا', match_date: '2026-06-23T19:00' },

  // Day 14 - Wednesday, June 24, 2026
  { home_team: 'South Africa', home_team_ar: 'جنوب إفريقيا', away_team: 'South Korea', away_team_ar: 'كوريا الجنوبية', stadium: 'Mercedes-Benz Stadium', stadium_ar: 'ملعب أتلانتا', city: 'Atlanta', city_ar: 'أتلانتا', match_date: '2026-06-24T14:00' },
  { home_team: 'DR Congo', home_team_ar: 'الكونغو الديمقراطية', away_team: 'Colombia', away_team_ar: 'كولومبيا', stadium: 'BMO Field', stadium_ar: 'ملعب تورونتو', city: 'Toronto', city_ar: 'تورونتو', match_date: '2026-06-24T16:00' },
  { home_team: 'England', home_team_ar: 'إنجلترا', away_team: 'Ghana', away_team_ar: 'غانا', stadium: 'NRG Stadium', stadium_ar: 'ملعب هيوستن', city: 'Houston', city_ar: 'هيوستن', match_date: '2026-06-24T17:00' },
  { home_team: 'Mexico', home_team_ar: 'المكسيك', away_team: 'Czech Republic/Ireland', away_team_ar: 'التشيك/أيرلندا', stadium: 'Hard Rock Stadium', stadium_ar: 'ملعب ساوث فلوريدا', city: 'Miami Gardens', city_ar: 'ميامي غاردنز', match_date: '2026-06-24T17:00' },
  { home_team: 'Croatia', home_team_ar: 'كرواتيا', away_team: 'Panama', away_team_ar: 'بنما', stadium: 'Estadio Akron', stadium_ar: 'ملعب غوادالاخارا', city: 'Guadalajara', city_ar: 'غوادالاخارا', match_date: '2026-06-24T18:00' },

  // Day 15 - Thursday, June 25, 2026
  { home_team: 'USA', home_team_ar: 'الولايات المتحدة', away_team: 'Turkey/Romania', away_team_ar: 'تركيا/رومانيا', stadium: 'Lincoln Financial Field', stadium_ar: 'ملعب فيلادلفيا', city: 'Philadelphia', city_ar: 'فيلادلفيا', match_date: '2026-06-25T15:00' },
  { home_team: 'Bosnia/Italy/Wales', home_team_ar: 'البوسنة/إيطاليا/ويلز', away_team: 'Qatar', away_team_ar: 'قطر', stadium: 'Estadio BBVA', stadium_ar: 'ملعب مونتيري', city: 'Guadalupe', city_ar: 'غوادالوبي', match_date: '2026-06-25T17:00' },
  { home_team: 'Canada', home_team_ar: 'كندا', away_team: 'Switzerland', away_team_ar: 'سويسرا', stadium: 'Estadio Azteca', stadium_ar: 'ملعب أزتيكا', city: 'Mexico City', city_ar: 'مكسيكو سيتي', match_date: '2026-06-25T18:00' },
  { home_team: 'Brazil', home_team_ar: 'البرازيل', away_team: 'Scotland', away_team_ar: 'إسكتلندا', stadium: 'BC Place', stadium_ar: 'ملعب فانكوفر', city: 'Vancouver', city_ar: 'فانكوفر', match_date: '2026-06-25T18:00' },
  { home_team: 'Morocco', home_team_ar: 'المغرب', away_team: 'Haiti', away_team_ar: 'هايتي', stadium: 'Lumen Field', stadium_ar: 'ملعب سياتل', city: 'Seattle', city_ar: 'سياتل', match_date: '2026-06-25T19:00' },

  // Day 16 - Friday, June 26, 2026
  { home_team: 'Spain', home_team_ar: 'إسبانيا', away_team: 'Uruguay', away_team_ar: 'أوروغواي', stadium: 'Gillette Stadium', stadium_ar: 'ملعب بوسطن', city: 'Foxborough', city_ar: 'فوكسبورو', match_date: '2026-06-26T15:00' },
  { home_team: 'Paraguay', home_team_ar: 'باراغواي', away_team: 'Australia', away_team_ar: 'أستراليا', stadium: 'MetLife Stadium', stadium_ar: 'ملعب نيويورك نيوجيرسي', city: 'East Rutherford', city_ar: 'أيست رذرفورد', match_date: '2026-06-26T15:00' },
  { home_team: 'Germany', home_team_ar: 'ألمانيا', away_team: 'Ecuador', away_team_ar: 'الإكوادور', stadium: 'AT&T Stadium', stadium_ar: 'ملعب دالاس', city: 'Arlington', city_ar: 'أرلينغتون', match_date: '2026-06-26T17:00' },
  { home_team: 'Curacao', home_team_ar: 'كوراساو', away_team: 'Ivory Coast', away_team_ar: 'ساحل العاج', stadium: 'Arrowhead Stadium', stadium_ar: 'ملعب كانساس سيتي', city: 'Kansas City', city_ar: 'كانساس سيتي', match_date: '2026-06-26T17:00' },
  { home_team: 'Netherlands', home_team_ar: 'هولندا', away_team: 'Tunisia', away_team_ar: 'تونس', stadium: 'SoFi Stadium', stadium_ar: 'ملعب لوس أنجلوس', city: 'Inglewood', city_ar: 'إنجلوود', match_date: '2026-06-26T18:00' },
  { home_team: 'Japan', home_team_ar: 'اليابان', away_team: 'Sweden/Poland', away_team_ar: 'السويد/بولندا', stadium: "Levi's Stadium", stadium_ar: 'ملعب منطقة خليج سان فرانسيسكو', city: 'Santa Clara', city_ar: 'سانتا كلارا', match_date: '2026-06-26T19:00' },

  // Day 17 - Saturday, June 27, 2026
  { home_team: 'Belgium', home_team_ar: 'بلجيكا', away_team: 'New Zealand', away_team_ar: 'نيوزيلندا', stadium: 'Hard Rock Stadium', stadium_ar: 'ملعب ساوث فلوريدا', city: 'Miami Gardens', city_ar: 'ميامي غاردنز', match_date: '2026-06-27T14:00' },
  { home_team: 'Egypt', home_team_ar: 'مصر', away_team: 'Iran', away_team_ar: 'إيران', stadium: 'Mercedes-Benz Stadium', stadium_ar: 'ملعب أتلانتا', city: 'Atlanta', city_ar: 'أتلانتا', match_date: '2026-06-27T14:00' },
  { home_team: 'France', home_team_ar: 'فرنسا', away_team: 'Norway', away_team_ar: 'النرويج', stadium: 'NRG Stadium', stadium_ar: 'ملعب هيوستن', city: 'Houston', city_ar: 'هيوستن', match_date: '2026-06-27T17:00' },
  { home_team: 'Senegal', home_team_ar: 'السنغال', away_team: 'Iraq/Bolivia', away_team_ar: 'العراق/بوليفيا', stadium: 'Estadio Akron', stadium_ar: 'ملعب غوادالاخارا', city: 'Guadalajara', city_ar: 'غوادالاخارا', match_date: '2026-06-27T18:00' },
  { home_team: 'Argentina', home_team_ar: 'الأرجنتين', away_team: 'Jordan', away_team_ar: 'الأردن', stadium: 'MetLife Stadium', stadium_ar: 'ملعب نيويورك نيوجيرسي', city: 'East Rutherford', city_ar: 'أيست رذرفورد', match_date: '2026-06-27T15:00' },
  { home_team: 'Algeria', home_team_ar: 'الجزائر', away_team: 'Austria', away_team_ar: 'النمسا', stadium: 'Lincoln Financial Field', stadium_ar: 'ملعب فيلادلفيا', city: 'Philadelphia', city_ar: 'فيلادلفيا', match_date: '2026-06-27T15:00' },
  { home_team: 'Portugal', home_team_ar: 'البرتغال', away_team: 'Colombia', away_team_ar: 'كولومبيا', stadium: 'Arrowhead Stadium', stadium_ar: 'ملعب كانساس سيتي', city: 'Kansas City', city_ar: 'كانساس سيتي', match_date: '2026-06-27T17:00' },
  { home_team: 'DR Congo', home_team_ar: 'الكونغو الديمقراطية', away_team: 'Uzbekistan', away_team_ar: 'أوزبكستان', stadium: 'AT&T Stadium', stadium_ar: 'ملعب دالاس', city: 'Arlington', city_ar: 'أرلينغتون', match_date: '2026-06-27T17:00' },
  { home_team: 'England', home_team_ar: 'إنجلترا', away_team: 'Panama', away_team_ar: 'بنما', stadium: 'BC Place', stadium_ar: 'ملعب فانكوفر', city: 'Vancouver', city_ar: 'فانكوفر', match_date: '2026-06-27T18:00' },
  { home_team: 'Croatia', home_team_ar: 'كرواتيا', away_team: 'Ghana', away_team_ar: 'غانا', stadium: 'Lumen Field', stadium_ar: 'ملعب سياتل', city: 'Seattle', city_ar: 'سياتل', match_date: '2026-06-27T19:00' },
  { home_team: 'Cape Verde', home_team_ar: 'الرأس الأخضر', away_team: 'Saudi Arabia', away_team_ar: 'السعودية', stadium: 'BMO Field', stadium_ar: 'ملعب تورونتو', city: 'Toronto', city_ar: 'تورونتو', match_date: '2026-06-27T16:00' }
];

console.log('Seeding FIFA World Cup 2026...');
console.log('Total matches:', groupMatches.length);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS matches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    home_team TEXT NOT NULL, away_team TEXT NOT NULL,
    home_team_ar TEXT NOT NULL, away_team_ar TEXT NOT NULL,
    home_team_flag TEXT, away_team_flag TEXT,
    stadium TEXT NOT NULL, stadium_ar TEXT NOT NULL, stadium_id INTEGER DEFAULT 1,
    city TEXT NOT NULL, city_ar TEXT NOT NULL,
    match_date TEXT NOT NULL,
    image TEXT, description TEXT, description_ar TEXT,
    stage TEXT NOT NULL, stage_ar TEXT NOT NULL,
    min_price REAL NOT NULL DEFAULT 25,
    is_active INTEGER NOT NULL DEFAULT 1,
    available_percentage INTEGER NOT NULL DEFAULT 100,
    group_name TEXT, sort_order INTEGER DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    match_id INTEGER NOT NULL,
    category TEXT NOT NULL, category_ar TEXT NOT NULL,
    seat_number TEXT NOT NULL, section TEXT NOT NULL, row TEXT,
    price REAL NOT NULL, status TEXT NOT NULL DEFAULT 'available',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT NOT NULL,
    country TEXT NOT NULL, notes TEXT,
    match_id INTEGER NOT NULL, selected_seats TEXT NOT NULL,
    total_price REAL NOT NULL, payment_status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (match_id) REFERENCES matches(id)
  );

  CREATE TABLE IF NOT EXISTS admin_credentials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`, (err) => {
  if (err) console.error('Error:', err);
  else console.log('Tables created');
  
  db.run('DELETE FROM tickets');
  db.run('DELETE FROM matches');
  
  let i = 0;
  const insertNext = () => {
    if (i < groupMatches.length) {
      const m = groupMatches[i];
      const sortOrder = i + 1;
      db.run(`INSERT INTO matches (home_team, away_team, home_team_ar, away_team_ar, stadium, stadium_ar, city, city_ar, match_date, stage, stage_ar, sort_order, is_active, min_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Group Stage', 'دور المجموعات', ?, 1, 25)`,
        [m.home_team, m.away_team, m.home_team_ar, m.away_team_ar, m.stadium, m.stadium_ar, m.city, m.city_ar, m.match_date, sortOrder],
        (err) => {
          if (err) console.error('Insert error:', err);
          i++;
          if (i % 10 === 0) console.log(`Inserted ${i}/${groupMatches.length}...`);
          insertNext();
        });
    } else {
      console.log('Matches inserted:', i);
      
      // Create tickets for all matches
      console.log('Creating tickets...');
      const categories = [
        { name: 'VIP', name_ar: 'VIP', price: 750 },
        { name: 'Premium', name_ar: 'مميز', price: 500 },
        { name: 'Standard', name_ar: 'عادي', price: 25 }
      ];
      const sections = ['A', 'B', 'C', 'D', 'E'];
      
      let ticketCount = 0;
      db.each('SELECT id FROM matches', (err, row) => {
        if (!err && row) {
          categories.forEach(cat => {
            sections.forEach(sec => {
              for (let row = 1; row <= 5; row++) {
                for (let seat = 1; seat <= 10; seat++) {
                  db.run('INSERT INTO tickets (match_id, category, category_ar, seat_number, section, row, price, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [row.id, cat.name, cat.name_ar, seat.toString(), sec, row.toString(), cat.price, 'available']);
                  ticketCount++;
                }
              }
            });
          });
        }
      }, (err) => {
        console.log('Tickets created:', ticketCount);
        console.log('Sample matches (first 5):');
        db.all('SELECT id, home_team_ar, match_date FROM matches ORDER BY sort_order ASC LIMIT 5', (err, rows) => {
          rows.forEach(r => console.log(`  ${r.id}. ${r.home_team_ar} - ${r.match_date}`));
          db.close();
          console.log('Done!');
        });
      });
    }
  };
  insertNext();
});
