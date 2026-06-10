require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.db'));

// Group Stage Matches for FIFA World Cup 2026
// 48 teams in 12 groups (A-L), each team plays 3 matches = 72 matches total
const groupMatches = [
  // ============ GROUP A ============
  { home_team: 'USA', home_team_ar: 'الولايات المتحدة', away_team: 'Canada', away_team_ar: 'كندا', stadium: 'Rose Bowl', stadium_ar: 'ملعب روز بول', city: 'Los Angeles', city_ar: 'لوس أنجلوس', match_date: '2026-06-11T18:00', group: 'A', sort_order: 1 },
  { home_team: 'Mexico', home_team_ar: 'المكسيك', away_team: 'Madagascar', away_team_ar: 'مدغشقر', stadium: 'Estadio Azteca', stadium_ar: 'ملعب أزتيكا', city: 'Mexico City', city_ar: 'مكسيكو سيتي', match_date: '2026-06-11T21:00', group: 'A', sort_order: 2 },
  { home_team: 'USA', home_team_ar: 'الولايات المتحدة', away_team: 'Madagascar', away_team_ar: 'مدغشقر', stadium: 'MetLife Stadium', stadium_ar: 'ملعب ميتلايف', city: 'New Jersey', city_ar: 'نيوجيرسي', match_date: '2026-06-15T16:00', group: 'A', sort_order: 3 },
  { home_team: 'Mexico', home_team_ar: 'المكسيك', away_team: 'Canada', away_team_ar: 'كندا', stadium: 'NRG Stadium', stadium_ar: 'ملعب NRG', city: 'Houston', city_ar: 'هيوستن', match_date: '2026-06-15T19:00', group: 'A', sort_order: 4 },
  { home_team: 'Canada', home_team_ar: 'كندا', away_team: 'Madagascar', away_team_ar: 'مدغشقر', stadium: 'BC Place', stadium_ar: 'ملعب BC بليس', city: 'Vancouver', city_ar: 'فانكوفر', match_date: '2026-06-19T16:00', group: 'A', sort_order: 5 },
  { home_team: 'USA', home_team_ar: 'الولايات المتحدة', away_team: 'Mexico', away_team_ar: 'المكسيك', stadium: 'SoFi Stadium', stadium_ar: 'ملعب صوفي', city: 'Los Angeles', city_ar: 'لوس أنجلوس', match_date: '2026-06-19T19:00', group: 'A', sort_order: 6 },

  // ============ GROUP B ============
  { home_team: 'Brazil', home_team_ar: 'البرازيل', away_team: 'Croatia', away_team_ar: 'كرواتيا', stadium: 'MetLife Stadium', stadium_ar: 'ملعب ميتلايف', city: 'New Jersey', city_ar: 'نيوجيرسي', match_date: '2026-06-11T16:00', group: 'B', sort_order: 7 },
  { home_team: 'Slovenia', home_team_ar: 'سلوفينيا', away_team: 'New Zealand', away_team_ar: 'نيوزيلندا', stadium: 'Levi Stadium', stadium_ar: 'ملعب ليفي', city: 'Santa Clara', city_ar: 'سانتا كلارا', match_date: '2026-06-12T16:00', group: 'B', sort_order: 8 },
  { home_team: 'Brazil', home_team_ar: 'البرازيل', away_team: 'Slovenia', away_team_ar: 'سلوفينيا', stadium: 'AT&T Stadium', stadium_ar: 'ملعب AT&T', city: 'Dallas', city_ar: 'دالاس', match_date: '2026-06-16T13:00', group: 'B', sort_order: 9 },
  { home_team: 'Croatia', home_team_ar: 'كرواتيا', away_team: 'New Zealand', away_team_ar: 'نيوزيلندا', stadium: 'GEODIS Park', stadium_ar: 'ملعب جيوديس', city: 'Nashville', city_ar: 'ناشفيل', match_date: '2026-06-16T16:00', group: 'B', sort_order: 10 },
  { home_team: 'Brazil', home_team_ar: 'البرازيل', away_team: 'New Zealand', away_team_ar: 'نيوزيلندا', stadium: 'SoFi Stadium', stadium_ar: 'ملعب صوفي', city: 'Los Angeles', city_ar: 'لوس أنجلوس', match_date: '2026-06-20T16:00', group: 'B', sort_order: 11 },
  { home_team: 'Croatia', home_team_ar: 'كرواتيا', away_team: 'Slovenia', away_team_ar: 'سلوفينيا', stadium: 'Arrowhead Stadium', stadium_ar: 'ملعب أروهيد', city: 'Kansas City', city_ar: 'كانساس سيتي', match_date: '2026-06-20T19:00', group: 'B', sort_order: 12 },

  // ============ GROUP C ============
  { home_team: 'Argentina', home_team_ar: 'الأرجنتين', away_team: 'Peru', away_team_ar: 'بيرو', stadium: 'MetLife Stadium', stadium_ar: 'ملعب ميتلايف', city: 'New Jersey', city_ar: 'نيوجيرسي', match_date: '2026-06-12T13:00', group: 'C', sort_order: 13 },
  { home_team: 'Chile', home_team_ar: 'تشيلي', away_team: 'Trinidad & Tobago', away_team_ar: 'ترينيداد وتوباغو', stadium: 'NRG Stadium', stadium_ar: 'ملعب NRG', city: 'Houston', city_ar: 'هيوستن', match_date: '2026-06-12T19:00', group: 'C', sort_order: 14 },
  { home_team: 'Argentina', home_team_ar: 'الأرجنتين', away_team: 'Chile', away_team_ar: 'تشيلي', stadium: 'Rose Bowl', stadium_ar: 'ملعب روز بول', city: 'Los Angeles', city_ar: 'لوس أنجلوس', match_date: '2026-06-16T19:00', group: 'C', sort_order: 15 },
  { home_team: 'Peru', home_team_ar: 'بيرو', away_team: 'Trinidad & Tobago', away_team_ar: 'ترينيداد وتوباغو', stadium: 'Q2 Stadium', stadium_ar: 'ملعب Q2', city: 'Austin', city_ar: 'أوستن', match_date: '2026-06-17T16:00', group: 'C', sort_order: 16 },
  { home_team: 'Argentina', home_team_ar: 'الأرجنتين', away_team: 'Trinidad & Tobago', away_team_ar: 'ترينيداد وتوباغو', stadium: 'AT&T Stadium', stadium_ar: 'ملعب AT&T', city: 'Dallas', city_ar: 'دالاس', match_date: '2026-06-21T16:00', group: 'C', sort_order: 17 },
  { home_team: 'Peru', home_team_ar: 'بيرو', away_team: 'Chile', away_team_ar: 'تشيلي', stadium: 'Levi Stadium', stadium_ar: 'ملعب ليفي', city: 'Santa Clara', city_ar: 'سانتا كلارا', match_date: '2026-06-21T19:00', group: 'C', sort_order: 18 },

  // ============ GROUP D ============
  { home_team: 'France', home_team_ar: 'فرنسا', away_team: 'Portugal', away_team_ar: 'البرتغال', stadium: 'SoFi Stadium', stadium_ar: 'ملعب صوفي', city: 'Los Angeles', city_ar: 'لوس أنجلوس', match_date: '2026-06-12T10:00', group: 'D', sort_order: 19 },
  { home_team: 'Sweden', home_team_ar: 'السويد', away_team: 'Greece', away_team_ar: 'اليونان', stadium: 'BC Place', stadium_ar: 'ملعب BC بليس', city: 'Vancouver', city_ar: 'فانكوفر', match_date: '2026-06-13T16:00', group: 'D', sort_order: 20 },
  { home_team: 'France', home_team_ar: 'فرنسا', away_team: 'Sweden', away_team_ar: 'السويد', stadium: 'MetLife Stadium', stadium_ar: 'ملعب ميتلايف', city: 'New Jersey', city_ar: 'نيوجيرسي', match_date: '2026-06-17T13:00', group: 'D', sort_order: 21 },
  { home_team: 'Portugal', home_team_ar: 'البرتغال', away_team: 'Greece', away_team_ar: 'اليونان', stadium: 'GEODIS Park', stadium_ar: 'ملعب جيوديس', city: 'Nashville', city_ar: 'ناشفيل', match_date: '2026-06-17T19:00', group: 'D', sort_order: 22 },
  { home_team: 'Portugal', home_team_ar: 'البرتغال', away_team: 'Sweden', away_team_ar: 'السويد', stadium: 'Rose Bowl', stadium_ar: 'ملعب روز بول', city: 'Los Angeles', city_ar: 'لوس أنجلوس', match_date: '2026-06-21T13:00', group: 'D', sort_order: 23 },
  { home_team: 'France', home_team_ar: 'فرنسا', away_team: 'Greece', away_team_ar: 'اليونان', stadium: 'Arrowhead Stadium', stadium_ar: 'ملعب أروهيد', city: 'Kansas City', city_ar: 'كانساس سيتي', match_date: '2026-06-21T16:00', group: 'D', sort_order: 24 },

  // ============ GROUP E ============
  { home_team: 'Germany', home_team_ar: 'ألمانيا', away_team: 'Spain', away_team_ar: 'إسبانيا', stadium: 'AT&T Stadium', stadium_ar: 'ملعب AT&T', city: 'Dallas', city_ar: 'دالاس', match_date: '2026-06-13T13:00', group: 'E', sort_order: 25 },
  { home_team: 'Italy', home_team_ar: 'إيطاليا', away_team: 'Wales', away_team_ar: 'ويلز', stadium: 'Q2 Stadium', stadium_ar: 'ملعب Q2', city: 'Austin', city_ar: 'أوستن', match_date: '2026-06-13T19:00', group: 'E', sort_order: 26 },
  { home_team: 'Germany', home_team_ar: 'ألمانيا', away_team: 'Italy', away_team_ar: 'إيطاليا', stadium: 'SoFi Stadium', stadium_ar: 'ملعب صوفي', city: 'Los Angeles', city_ar: 'لوس أنجلوس', match_date: '2026-06-18T13:00', group: 'E', sort_order: 27 },
  { home_team: 'Spain', home_team_ar: 'إسبانيا', away_team: 'Wales', away_team_ar: 'ويلز', stadium: 'NRG Stadium', stadium_ar: 'ملعب NRG', city: 'Houston', city_ar: 'هيوستن', match_date: '2026-06-18T16:00', group: 'E', sort_order: 28 },
  { home_team: 'Spain', home_team_ar: 'إسبانيا', away_team: 'Italy', away_team_ar: 'إيطاليا', stadium: 'Levi Stadium', stadium_ar: 'ملعب ليفي', city: 'Santa Clara', city_ar: 'سانتا كلارا', match_date: '2026-06-22T16:00', group: 'E', sort_order: 29 },
  { home_team: 'Germany', home_team_ar: 'ألمانيا', away_team: 'Wales', away_team_ar: 'ويلز', stadium: 'BC Place', stadium_ar: 'ملعب BC بليس', city: 'Vancouver', city_ar: 'فانكوفر', match_date: '2026-06-22T19:00', group: 'E', sort_order: 30 },

  // ============ GROUP F ============
  { home_team: 'England', home_team_ar: 'إنجلترا', away_team: 'Netherlands', away_team_ar: 'هولندا', stadium: 'Arrowhead Stadium', stadium_ar: 'ملعب أروهيد', city: 'Kansas City', city_ar: 'كانساس سيتي', match_date: '2026-06-13T10:00', group: 'F', sort_order: 31 },
  { home_team: 'Poland', home_team_ar: 'بولندا', away_team: 'Turkey', away_team_ar: 'تركيا', stadium: 'GEODIS Park', stadium_ar: 'ملعب جيوديس', city: 'Nashville', city_ar: 'ناشفيل', match_date: '2026-06-14T16:00', group: 'F', sort_order: 32 },
  { home_team: 'England', home_team_ar: 'إنجلترا', away_team: 'Poland', away_team_ar: 'بولندا', stadium: 'MetLife Stadium', stadium_ar: 'ملعب ميتلايف', city: 'New Jersey', city_ar: 'نيوجيرسي', match_date: '2026-06-18T10:00', group: 'F', sort_order: 33 },
  { home_team: 'Netherlands', home_team_ar: 'هولندا', away_team: 'Turkey', away_team_ar: 'تركيا', stadium: 'Rose Bowl', stadium_ar: 'ملعب روز بول', city: 'Los Angeles', city_ar: 'لوس أنجلوس', match_date: '2026-06-18T19:00', group: 'F', sort_order: 34 },
  { home_team: 'Netherlands', home_team_ar: 'هولندا', away_team: 'Poland', away_team_ar: 'بولندا', stadium: 'AT&T Stadium', stadium_ar: 'ملعب AT&T', city: 'Dallas', city_ar: 'دالاس', match_date: '2026-06-22T13:00', group: 'F', sort_order: 35 },
  { home_team: 'England', home_team_ar: 'إنجلترا', away_team: 'Turkey', away_team_ar: 'تركيا', stadium: 'SoFi Stadium', stadium_ar: 'ملعب صوفي', city: 'Los Angeles', city_ar: 'لوس أنجلوس', match_date: '2026-06-22T16:00', group: 'F', sort_order: 36 },

  // ============ GROUP G ============
  { home_team: 'Colombia', home_team_ar: 'كولومبيا', away_team: 'Uruguay', away_team_ar: 'أوروغواي', stadium: 'SoFi Stadium', stadium_ar: 'ملعب صوفي', city: 'Los Angeles', city_ar: 'لوس أنجلوس', match_date: '2026-06-14T13:00', group: 'G', sort_order: 37 },
  { home_team: 'Paraguay', home_team_ar: 'باراغواي', away_team: 'Venezuela', away_team_ar: 'فنزويلا', stadium: 'Levi Stadium', stadium_ar: 'ملعب ليفي', city: 'Santa Clara', city_ar: 'سانتا كلارا', match_date: '2026-06-14T19:00', group: 'G', sort_order: 38 },
  { home_team: 'Colombia', home_team_ar: 'كولومبيا', away_team: 'Paraguay', away_team_ar: 'باراغواي', stadium: 'NRG Stadium', stadium_ar: 'ملعب NRG', city: 'Houston', city_ar: 'هيوستن', match_date: '2026-06-19T13:00', group: 'G', sort_order: 39 },
  { home_team: 'Uruguay', home_team_ar: 'أوروغواي', away_team: 'Venezuela', away_team_ar: 'فنزويلا', stadium: 'Q2 Stadium', stadium_ar: 'ملعب Q2', city: 'Austin', city_ar: 'أوستن', match_date: '2026-06-19T16:00', group: 'G', sort_order: 40 },
  { home_team: 'Uruguay', home_team_ar: 'أوروغواي', away_team: 'Paraguay', away_team_ar: 'باراغواي', stadium: 'MetLife Stadium', stadium_ar: 'ملعب ميتلايف', city: 'New Jersey', city_ar: 'نيوجيرسي', match_date: '2026-06-23T16:00', group: 'G', sort_order: 41 },
  { home_team: 'Colombia', home_team_ar: 'كولومبيا', away_team: 'Venezuela', away_team_ar: 'فنزويلا', stadium: 'BC Place', stadium_ar: 'ملعب BC بليس', city: 'Vancouver', city_ar: 'فانكوفر', match_date: '2026-06-23T19:00', group: 'G', sort_order: 42 },

  // ============ GROUP H ============
  { home_team: 'Belgium', home_team_ar: 'بلجيكا', away_team: 'Denmark', away_team_ar: 'الدنمارك', stadium: 'BC Place', stadium_ar: 'ملعب BC بليس', city: 'Vancouver', city_ar: 'فانكوفر', match_date: '2026-06-14T10:00', group: 'H', sort_order: 43 },
  { home_team: 'Serbia', home_team_ar: 'صربيا', away_team: 'Romania', away_team_ar: 'رومانيا', stadium: 'Arrowhead Stadium', stadium_ar: 'ملعب أروهيد', city: 'Kansas City', city_ar: 'كانساس سيتي', match_date: '2026-06-15T16:00', group: 'H', sort_order: 44 },
  { home_team: 'Belgium', home_team_ar: 'بلجيكا', away_team: 'Serbia', away_team_ar: 'صربيا', stadium: 'Rose Bowl', stadium_ar: 'ملعب روز بول', city: 'Los Angeles', city_ar: 'لوس أنجلوس', match_date: '2026-06-20T13:00', group: 'H', sort_order: 45 },
  { home_team: 'Denmark', home_team_ar: 'الدنمارك', away_team: 'Romania', away_team_ar: 'رومانيا', stadium: 'GEODIS Park', stadium_ar: 'ملعب جيوديس', city: 'Nashville', city_ar: 'ناشفيل', match_date: '2026-06-20T16:00', group: 'H', sort_order: 46 },
  { home_team: 'Denmark', home_team_ar: 'الدنمارك', away_team: 'Serbia', away_team_ar: 'صربيا', stadium: 'AT&T Stadium', stadium_ar: 'ملعب AT&T', city: 'Dallas', city_ar: 'دالاس', match_date: '2026-06-24T16:00', group: 'H', sort_order: 47 },
  { home_team: 'Belgium', home_team_ar: 'بلجيكا', away_team: 'Romania', away_team_ar: 'رومانيا', stadium: 'SoFi Stadium', stadium_ar: 'ملعب صوفي', city: 'Los Angeles', city_ar: 'لوس أنجلوس', match_date: '2026-06-24T19:00', group: 'H', sort_order: 48 },

  // ============ GROUP I ============
  { home_team: 'Japan', home_team_ar: 'اليابان', away_team: 'South Korea', away_team_ar: 'كوريا الجنوبية', stadium: 'Levi Stadium', stadium_ar: 'ملعب ليفي', city: 'Santa Clara', city_ar: 'سانتا كلارا', match_date: '2026-06-15T10:00', group: 'I', sort_order: 49 },
  { home_team: 'Australia', home_team_ar: 'أستراليا', away_team: 'Qatar', away_team_ar: 'قطر', stadium: 'Q2 Stadium', stadium_ar: 'ملعب Q2', city: 'Austin', city_ar: 'أوستن', match_date: '2026-06-15T13:00', group: 'I', sort_order: 50 },
  { home_team: 'Japan', home_team_ar: 'اليابان', away_team: 'Australia', away_team_ar: 'أستراليا', stadium: 'NRG Stadium', stadium_ar: 'ملعب NRG', city: 'Houston', city_ar: 'هيوستن', match_date: '2026-06-20T10:00', group: 'I', sort_order: 51 },
  { home_team: 'South Korea', home_team_ar: 'كوريا الجنوبية', away_team: 'Qatar', away_team_ar: 'قطر', stadium: 'BC Place', stadium_ar: 'ملعب BC بليس', city: 'Vancouver', city_ar: 'فانكوفر', match_date: '2026-06-20T13:00', group: 'I', sort_order: 52 },
  { home_team: 'South Korea', home_team_ar: 'كوريا الجنوبية', away_team: 'Australia', away_team_ar: 'أستراليا', stadium: 'Arrowhead Stadium', stadium_ar: 'ملعب أروهيد', city: 'Kansas City', city_ar: 'كانساس سيتي', match_date: '2026-06-24T13:00', group: 'I', sort_order: 53 },
  { home_team: 'Japan', home_team_ar: 'اليابان', away_team: 'Qatar', away_team_ar: 'قطر', stadium: 'MetLife Stadium', stadium_ar: 'ملعب ميتلايف', city: 'New Jersey', city_ar: 'نيوجيرسي', match_date: '2026-06-24T16:00', group: 'I', sort_order: 54 },

  // ============ GROUP J ============
  { home_team: 'Morocco', home_team_ar: 'المغرب', away_team: 'Egypt', away_team_ar: 'مصر', stadium: 'MetLife Stadium', stadium_ar: 'ملعب ميتلايف', city: 'New Jersey', city_ar: 'نيوجيرسي', match_date: '2026-06-16T10:00', group: 'J', sort_order: 55 },
  { home_team: 'Algeria', home_team_ar: 'الجزائر', away_team: 'Nigeria', away_team_ar: 'نيجيريا', stadium: 'GEODIS Park', stadium_ar: 'ملعب جيوديس', city: 'Nashville', city_ar: 'ناشفيل', match_date: '2026-06-16T16:00', group: 'J', sort_order: 56 },
  { home_team: 'Morocco', home_team_ar: 'المغرب', away_team: 'Algeria', away_team_ar: 'الجزائر', stadium: 'SoFi Stadium', stadium_ar: 'ملعب صوفي', city: 'Los Angeles', city_ar: 'لوس أنجلوس', match_date: '2026-06-21T10:00', group: 'J', sort_order: 57 },
  { home_team: 'Egypt', home_team_ar: 'مصر', away_team: 'Nigeria', away_team_ar: 'نيجيريا', stadium: 'Rose Bowl', stadium_ar: 'ملعب روز بول', city: 'Los Angeles', city_ar: 'لوس أنجلوس', match_date: '2026-06-21T16:00', group: 'J', sort_order: 58 },
  { home_team: 'Egypt', home_team_ar: 'مصر', away_team: 'Algeria', away_team_ar: 'الجزائر', stadium: 'AT&T Stadium', stadium_ar: 'ملعب AT&T', city: 'Dallas', city_ar: 'دالاس', match_date: '2026-06-25T16:00', group: 'J', sort_order: 59 },
  { home_team: 'Morocco', home_team_ar: 'المغرب', away_team: 'Nigeria', away_team_ar: 'نيجيريا', stadium: 'NRG Stadium', stadium_ar: 'ملعب NRG', city: 'Houston', city_ar: 'هيوستن', match_date: '2026-06-25T19:00', group: 'J', sort_order: 60 },

  // ============ GROUP K ============
  { home_team: 'Senegal', home_team_ar: 'السنغال', away_team: 'Cameroon', away_team_ar: 'الكاميرون', stadium: 'AT&T Stadium', stadium_ar: 'ملعب AT&T', city: 'Dallas', city_ar: 'دالاس', match_date: '2026-06-17T16:00', group: 'K', sort_order: 61 },
  { home_team: 'Ghana', home_team_ar: 'غانا', away_team: 'Ivory Coast', away_team_ar: 'ساحل العاج', stadium: 'Levi Stadium', stadium_ar: 'ملعب ليفي', city: 'Santa Clara', city_ar: 'سانتا كلارا', match_date: '2026-06-17T19:00', group: 'K', sort_order: 62 },
  { home_team: 'Senegal', home_team_ar: 'السنغال', away_team: 'Ghana', away_team_ar: 'غانا', stadium: 'Q2 Stadium', stadium_ar: 'ملعب Q2', city: 'Austin', city_ar: 'أوستن', match_date: '2026-06-22T10:00', group: 'K', sort_order: 63 },
  { home_team: 'Cameroon', home_team_ar: 'الكاميرون', away_team: 'Ivory Coast', away_team_ar: 'ساحل العاج', stadium: 'Arrowhead Stadium', stadium_ar: 'ملعب أروهيد', city: 'Kansas City', city_ar: 'كانساس سيتي', match_date: '2026-06-22T13:00', group: 'K', sort_order: 64 },
  { home_team: 'Cameroon', home_team_ar: 'الكاميرون', away_team: 'Ghana', away_team_ar: 'غانا', stadium: 'BC Place', stadium_ar: 'ملعب BC بليس', city: 'Vancouver', city_ar: 'فانكوفر', match_date: '2026-06-25T13:00', group: 'K', sort_order: 65 },
  { home_team: 'Senegal', home_team_ar: 'السنغال', away_team: 'Ivory Coast', away_team_ar: 'ساحل العاج', stadium: 'SoFi Stadium', stadium_ar: 'ملعب صوفي', city: 'Los Angeles', city_ar: 'لوس أنجلوس', match_date: '2026-06-25T16:00', group: 'K', sort_order: 66 },

  // ============ GROUP L ============
  { home_team: 'Saudi Arabia', home_team_ar: 'السعودية', away_team: 'Iran', away_team_ar: 'إيران', stadium: 'Rose Bowl', stadium_ar: 'ملعب روز بول', city: 'Los Angeles', city_ar: 'لوس أنجلوس', match_date: '2026-06-14T16:00', group: 'L', sort_order: 67 },
  { home_team: 'UAE', home_team_ar: 'الإمارات', away_team: 'Iraq', away_team_ar: 'العراق', stadium: 'MetLife Stadium', stadium_ar: 'ملعب ميتلايف', city: 'New Jersey', city_ar: 'نيوجيرسي', match_date: '2026-06-14T19:00', group: 'L', sort_order: 68 },
  { home_team: 'Saudi Arabia', home_team_ar: 'السعودية', away_team: 'UAE', away_team_ar: 'الإمارات', stadium: 'NRG Stadium', stadium_ar: 'ملعب NRG', city: 'Houston', city_ar: 'هيوستن', match_date: '2026-06-19T19:00', group: 'L', sort_order: 69 },
  { home_team: 'Iran', home_team_ar: 'إيران', away_team: 'Iraq', away_team_ar: 'العراق', stadium: 'BC Place', stadium_ar: 'ملعب BC بليس', city: 'Vancouver', city_ar: 'فانكوفر', match_date: '2026-06-20T19:00', group: 'L', sort_order: 70 },
  { home_team: 'Iran', home_team_ar: 'إيران', away_team: 'UAE', away_team_ar: 'الإمارات', stadium: 'Arrowhead Stadium', stadium_ar: 'ملعب أروهيد', city: 'Kansas City', city_ar: 'كانساس سيتي', match_date: '2026-06-25T10:00', group: 'L', sort_order: 71 },
  { home_team: 'Saudi Arabia', home_team_ar: 'السعودية', away_team: 'Iraq', away_team_ar: 'العراق', stadium: 'GEODIS Park', stadium_ar: 'ملعب جيوديس', city: 'Nashville', city_ar: 'ناشفيل', match_date: '2026-06-25T13:00', group: 'L', sort_order: 72 }
];

console.log('Seeding Group Stage Matches...');
console.log(`Total matches to insert: ${groupMatches.length}`);

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
    min_price REAL NOT NULL DEFAULT 0,
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
  if (err) console.error('Table creation error:', err);
  else console.log('Tables created');
  
  // Clear existing
  db.run('DELETE FROM tickets', (err) => {
    if (err) console.error('Delete tickets error:', err);
  });
  db.run('DELETE FROM matches', (err) => {
    if (err) console.error('Delete matches error:', err);
  });
  
  // Insert matches using async series
  let inserted = 0;
  const insertMatch = (match, callback) => {
    db.run(`
      INSERT INTO matches (
        home_team, away_team, home_team_ar, away_team_ar,
        stadium, stadium_ar, city, city_ar, match_date,
        stage, stage_ar, group_name, sort_order, is_active, min_price
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Group Stage', 'دور المجموعات', ?, ?, 1, 25)
    `, [
      match.home_team, match.away_team, match.home_team_ar, match.away_team_ar,
      match.stadium, match.stadium_ar, match.city, match.city_ar, match.match_date,
      match.group, match.sort_order
    ], function(err) {
      if (err) console.error('Insert error:', err);
      else inserted++;
      callback();
    });
  };
  
  // Process all matches
  let i = 0;
  const next = () => {
    if (i < groupMatches.length) {
      insertMatch(groupMatches[i], () => {
        i++;
        if (i % 10 === 0) console.log(`Inserted ${i}/${groupMatches.length} matches...`);
        next();
      });
    } else {
      console.log(`✅ Successfully inserted ${inserted} group stage matches!`);
      
      // Count by group
      const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
      console.log('\nMatches by group:');
      groups.forEach(g => {
        db.get('SELECT COUNT(*) as count FROM matches WHERE group_name = ?', [g], (err, row) => {
          if (!err) console.log(`  Group ${g}: ${row.count} matches`);
        });
      });
      
      // Show sample
      setTimeout(() => {
        db.all('SELECT id, home_team_ar, away_team_ar, group_name, match_date FROM matches ORDER BY sort_order LIMIT 6', (err, rows) => {
          if (!err) {
            console.log('\nSample matches:');
            rows.forEach(m => {
              console.log(`  ${m.id}. ${m.home_team_ar} vs ${m.away_team_ar} (Group ${m.group_name})`);
            });
          }
          db.close();
          console.log('\n✅ Seeding completed!');
        });
      }, 100);
    }
  };
  next();
});
