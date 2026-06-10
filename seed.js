require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database(path.join(__dirname, 'database.db'));

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

async function seed() {
  console.log('Seeding database...');

  try {
    // Create tables first
    db.exec(`
      CREATE TABLE IF NOT EXISTS matches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        home_team TEXT NOT NULL,
        away_team TEXT NOT NULL,
        home_team_ar TEXT NOT NULL,
        away_team_ar TEXT NOT NULL,
        home_team_flag TEXT,
        away_team_flag TEXT,
        stadium TEXT NOT NULL,
        stadium_ar TEXT NOT NULL,
        city TEXT NOT NULL,
        city_ar TEXT NOT NULL,
        match_date TEXT NOT NULL,
        image TEXT,
        description TEXT,
        description_ar TEXT,
        stage TEXT NOT NULL,
        stage_ar TEXT NOT NULL,
        min_price REAL NOT NULL DEFAULT 0,
        is_active INTEGER NOT NULL DEFAULT 1,
        available_percentage INTEGER NOT NULL DEFAULT 100,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        match_id INTEGER NOT NULL,
        category TEXT NOT NULL,
        category_ar TEXT NOT NULL,
        seat_number TEXT NOT NULL,
        section TEXT NOT NULL,
        row TEXT,
        price REAL NOT NULL,
        status TEXT NOT NULL DEFAULT 'available',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        country TEXT NOT NULL,
        notes TEXT,
        match_id INTEGER NOT NULL,
        selected_seats TEXT NOT NULL,
        total_price REAL NOT NULL,
        payment_status TEXT NOT NULL DEFAULT 'pending',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (match_id) REFERENCES matches(id)
      );

      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        title_ar TEXT NOT NULL,
        content TEXT NOT NULL,
        content_ar TEXT NOT NULL,
        image TEXT,
        is_published INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT NOT NULL UNIQUE,
        value TEXT NOT NULL,
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS visitors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        match_id INTEGER,
        visited_at TEXT NOT NULL DEFAULT (datetime('now')),
        completed_order INTEGER NOT NULL DEFAULT 0,
        order_id TEXT,
        FOREIGN KEY (match_id) REFERENCES matches(id)
      );

      CREATE TABLE IF NOT EXISTS admin_credentials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);
    console.log('Tables created successfully');
    // Helper function to get flag URL from team name
function getFlagUrl(teamName) {
    const flags = {
        'mexico': 'https://flagcdn.com/w80/mx.png',
        'canada': 'https://flagcdn.com/w80/ca.png',
        'usa': 'https://flagcdn.com/w80/us.png',
        'brazil': 'https://flagcdn.com/w80/br.png',
        'argentina': 'https://flagcdn.com/w80/ar.png',
        'germany': 'https://flagcdn.com/w80/de.png',
        'france': 'https://flagcdn.com/w80/fr.png',
        'spain': 'https://flagcdn.com/w80/es.png',
        'england': 'https://flagcdn.com/w80/gb.png',
        'italy': 'https://flagcdn.com/w80/it.png',
        'portugal': 'https://flagcdn.com/w80/pt.png',
        'netherlands': 'https://flagcdn.com/w80/nl.png',
        'belgium': 'https://flagcdn.com/w80/be.png',
        'japan': 'https://flagcdn.com/w80/jp.png',
        'south korea': 'https://flagcdn.com/w80/kr.png',
        'australia': 'https://flagcdn.com/w80/au.png',
        'morocco': 'https://flagcdn.com/w80/ma.png',
        'senegal': 'https://flagcdn.com/w80/sn.png',
        'egypt': 'https://flagcdn.com/w80/eg.png',
        'nigeria': 'https://flagcdn.com/w80/ng.png',
        'south africa': 'https://flagcdn.com/w80/za.png',
        'qatar': 'https://flagcdn.com/w80/qa.png',
        'saudi': 'https://flagcdn.com/w80/sa.png',
        'uae': 'https://flagcdn.com/w80/ae.png',
        'china': 'https://flagcdn.com/w80/cn.png',
        'iran': 'https://flagcdn.com/w80/ir.png',
        'poland': 'https://flagcdn.com/w80/pl.png',
        'ukraine': 'https://flagcdn.com/w80/ua.png',
        'croatia': 'https://flagcdn.com/w80/hr.png',
        'switzerland': 'https://flagcdn.com/w80/ch.png',
        'sweden': 'https://flagcdn.com/w80/se.png',
        'denmark': 'https://flagcdn.com/w80/dk.png',
        'norway': 'https://flagcdn.com/w80/no.png',
        'austria': 'https://flagcdn.com/w80/at.png',
        'czech': 'https://flagcdn.com/w80/cz.png',
        'romania': 'https://flagcdn.com/w80/ro.png',
        'hungary': 'https://flagcdn.com/w80/hu.png',
        'chile': 'https://flagcdn.com/w80/cl.png',
        'colombia': 'https://flagcdn.com/w80/co.png',
        'peru': 'https://flagcdn.com/w80/pe.png',
        'ecuador': 'https://flagcdn.com/w80/ec.png',
        'uruguay': 'https://flagcdn.com/w80/uy.png',
        'paraguay': 'https://flagcdn.com/w80/py.png',
        'venezuela': 'https://flagcdn.com/w80/ve.png',
        'tunisia': 'https://flagcdn.com/w80/tn.png',
        'algeria': 'https://flagcdn.com/w80/dz.png',
        'cameroon': 'https://flagcdn.com/w80/cm.png',
        'ghana': 'https://flagcdn.com/w80/gh.png',
        'ivory coast': 'https://flagcdn.com/w80/ci.png',
        'serbia': 'https://flagcdn.com/w80/rs.png',
        'slovenia': 'https://flagcdn.com/w80/si.png',
        'slovakia': 'https://flagcdn.com/w80/sk.png',
        'finland': 'https://flagcdn.com/w80/fi.png',
        'ireland': 'https://flagcdn.com/w80/ie.png',
        'scotland': 'https://flagcdn.com/w80/gb.png',
        'wales': 'https://flagcdn.com/w80/gb.png',
        'new zealand': 'https://flagcdn.com/w80/nz.png',
        'costa rica': 'https://flagcdn.com/w80/cr.png',
        'panama': 'https://flagcdn.com/w80/pa.png',
        'jamaica': 'https://flagcdn.com/w80/jm.png',
        'honduras': 'https://flagcdn.com/w80/hn.png',
        'to be decided': 'https://flagcdn.com/w80/un.png',
    };
    return flags[teamName.toLowerCase()] || '';
}
    const matches = [
{
    homeTeam: 'Mexico',
    awayTeam: 'To Be Decided',
    homeTeamAr: 'المكسيك',
    awayTeamAr: 'يحدد لاحقاً',
    homeTeamFlag: getFlagUrl('mexico'),
    awayTeamFlag: getFlagUrl('to be decided'),
    stadium: 'Estadio Azteca',
    stadiumAr: 'ملعب أزتيكا',
    city: 'Mexico City',
    cityAr: 'مدينة المكسيك',
    matchDate: '2026-06-11T18:00:00',
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800',
    description: 'World Cup Opening Match - Group A',
    descriptionAr: 'المباراة الافتتاحية لكأس العالم - المجموعة الأولى',
    stage: 'Group Stage',
    stageAr: 'مرحلة المجموعات',
    minPrice: 25,
    isActive: 1
  },
  {
    homeTeam: 'Canada',
    awayTeam: 'To Be Decided',
    homeTeamAr: 'كندا',
    awayTeamAr: 'يحدد لاحقاً',
    homeTeamFlag: getFlagUrl('canada'),
    awayTeamFlag: getFlagUrl('to be decided'),
    stadium: 'BMO Field',
    stadiumAr: 'ملعب بي إم أو فيلد',
    city: 'Toronto',
    cityAr: 'تورونتو',
    matchDate: '2026-06-12T16:00:00',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800',
    description: 'Canada Opening Match - Group B',
    descriptionAr: 'مباراة كندا الافتتاحية - المجموعة الثانية',
    stage: 'Group Stage',
    stageAr: 'مرحلة المجموعات',
    minPrice: 25,
    isActive: 1
  },
  {
    homeTeam: 'USA',
    awayTeam: 'To Be Decided',
    homeTeamAr: 'الولايات المتحدة',
    awayTeamAr: 'يحدد لاحقاً',
    homeTeamFlag: getFlagUrl('usa'),
    awayTeamFlag: getFlagUrl('to be decided'),
    stadium: 'SoFi Stadium',
    stadiumAr: 'ملعب سوفي',
    city: 'Los Angeles',
    cityAr: 'لوس أنجلوس',
    matchDate: '2026-06-12T19:00:00',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800',
    description: 'USA Opening Match - Group D',
    descriptionAr: 'مباراة أمريكا الافتتاحية - المجموعة الرابعة',
    stage: 'Group Stage',
    stageAr: 'مرحلة المجموعات',
    minPrice: 25,
    isActive: 1
  },
  {
    homeTeam: 'Brazil',
    awayTeam: 'To Be Decided',
    homeTeamAr: 'البرازيل',
    awayTeamAr: 'يحدد لاحقاً',
    homeTeamFlag: getFlagUrl('brazil'),
    awayTeamFlag: getFlagUrl('to be decided'),
    stadium: 'MetLife Stadium',
    stadiumAr: 'ملعب ميت لايف',
    city: 'New York',
    cityAr: 'نيويورك',
    matchDate: '2026-06-15T19:00:00',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    description: 'Group Stage Match',
    descriptionAr: 'مباراة في مرحلة المجموعات',
    stage: 'Group Stage',
    stageAr: 'مرحلة المجموعات',
    minPrice: 25,
    isActive: 1
  },
  {
    homeTeam: 'France',
    awayTeam: 'To Be Decided',
    homeTeamAr: 'فرنسا',
    awayTeamAr: 'يحدد لاحقاً',
    homeTeamFlag: getFlagUrl('france'),
    awayTeamFlag: getFlagUrl('to be decided'),
    stadium: 'AT&T Stadium',
    stadiumAr: 'ملعب AT&T',
    city: 'Dallas',
    cityAr: 'دالاس',
    matchDate: '2026-06-16T16:00:00',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
    description: 'Group Stage Match',
    descriptionAr: 'مباراة في مرحلة المجموعات',
    stage: 'Group Stage',
    stageAr: 'مرحلة المجموعات',
    minPrice: 25,
    isActive: 1
  },
  {
    homeTeam: 'Spain',
    awayTeam: 'To Be Decided',
    homeTeamAr: 'إسبانيا',
    awayTeamAr: 'يحدد لاحقاً',
    homeTeamFlag: getFlagUrl('spain'),
    awayTeamFlag: getFlagUrl('to be decided'),
    stadium: 'Hard Rock Stadium',
    stadiumAr: 'ملعب هارد روك',
    city: 'Miami',
    cityAr: 'ميامي',
    matchDate: '2026-06-17T20:00:00',
    image: 'https://images.unsplash.com/photo-1504153922511-dfb5af905b2a?w=800',
    description: 'Group Stage Match',
    descriptionAr: 'مباراة في مرحلة المجموعات',
    stage: 'Group Stage',
    stageAr: 'مرحلة المجموعات',
    minPrice: 25,
    isActive: 1
  },
  {
    homeTeam: 'Argentina',
    awayTeam: 'To Be Decided',
    homeTeamAr: 'الأرجنتين',
    awayTeamAr: 'يحدد لاحقاً',
    homeTeamFlag: getFlagUrl('argentina'),
    awayTeamFlag: getFlagUrl('to be decided'),
    stadium: 'Mercedes-Benz Stadium',
    stadiumAr: 'ملعب مرسيدس بنز',
    city: 'Atlanta',
    cityAr: 'أتلانتا',
    matchDate: '2026-06-18T18:00:00',
    image: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=800',
    description: 'Group Stage Match',
    descriptionAr: 'مباراة في مرحلة المجموعات',
    stage: 'Group Stage',
    stageAr: 'مرحلة المجموعات',
    minPrice: 25,
    isActive: 1
  },
  {
    homeTeam: 'England',
    awayTeam: 'To Be Decided',
    homeTeamAr: 'إنجلترا',
    awayTeamAr: 'يحدد لاحقاً',
    homeTeamFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    awayTeamFlag: getFlagUrl('to be decided'),
    stadium: 'Lumen Field',
    stadiumAr: 'ملعب لومين',
    city: 'Seattle',
    cityAr: 'سياتل',
    matchDate: '2026-06-19T15:00:00',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
    description: 'Group Stage Match',
    descriptionAr: 'مباراة في مرحلة المجموعات',
    stage: 'Group Stage',
    stageAr: 'مرحلة المجموعات',
    minPrice: 25,
    isActive: 1
  },
  {
    homeTeam: 'To Be Decided',
    awayTeam: 'To Be Decided',
    homeTeamAr: 'يحدد لاحقاً',
    awayTeamAr: 'يحدد لاحقاً',
    homeTeamFlag: getFlagUrl('to be decided'),
    awayTeamFlag: getFlagUrl('to be decided'),
    stadium: 'Gillette Stadium',
    stadiumAr: 'ملعب جيليت',
    city: 'Boston',
    cityAr: 'بوسطن',
    matchDate: '2026-06-28T17:00:00',
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800',
    description: 'Round of 32',
    descriptionAr: 'دور الـ 32',
    stage: 'Round of 32',
    stageAr: 'دور الـ 32',
    minPrice: 25,
    isActive: 1
  },
  {
    homeTeam: 'To Be Decided',
    awayTeam: 'To Be Decided',
    homeTeamAr: 'يحدد لاحقاً',
    awayTeamAr: 'يحدد لاحقاً',
    homeTeamFlag: getFlagUrl('to be decided'),
    awayTeamFlag: getFlagUrl('to be decided'),
    stadium: 'Lincoln Financial Field',
    stadiumAr: 'ملعب لينكون فاينانشال',
    city: 'Philadelphia',
    cityAr: 'فيلادلفيا',
    matchDate: '2026-07-04T16:00:00',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800',
    description: 'Round of 16',
    descriptionAr: 'دور الـ 16',
    stage: 'Round of 16',
    stageAr: 'دور الـ 16',
    minPrice: 25,
    isActive: 1
  },
  {
    homeTeam: 'To Be Decided',
    awayTeam: 'To Be Decided',
    homeTeamAr: 'يحدد لاحقاً',
    awayTeamAr: 'يحدد لاحقاً',
    homeTeamFlag: getFlagUrl('to be decided'),
    awayTeamFlag: getFlagUrl('to be decided'),
    stadium: 'Arrowhead Stadium',
    stadiumAr: 'ملعب أروهيد',
    city: 'Kansas City',
    cityAr: 'كانساس سيتي',
    matchDate: '2026-07-10T18:00:00',
    image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800',
    description: 'Quarter-finals',
    descriptionAr: 'ربع النهائي',
    stage: 'Quarter-finals',
    stageAr: 'ربع النهائي',
    minPrice: 25,
    isActive: 1
  },
  {
    homeTeam: 'To Be Decided',
    awayTeam: 'To Be Decided',
    homeTeamAr: 'يحدد لاحقاً',
    awayTeamAr: 'يحدد لاحقاً',
    homeTeamFlag: getFlagUrl('to be decided'),
    awayTeamFlag: getFlagUrl('to be decided'),
    stadium: 'AT&T Stadium',
    stadiumAr: 'ملعب AT&T',
    city: 'Dallas',
    cityAr: 'دالاس',
    matchDate: '2026-07-14T19:00:00',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
    description: 'Semi-finals',
    descriptionAr: 'نصف النهائي',
    stage: 'Semi-finals',
    stageAr: 'نصف النهائي',
    minPrice: 25,
    isActive: 1
  },
  {
    homeTeam: 'To Be Decided',
    awayTeam: 'To Be Decided',
    homeTeamAr: 'يحدد لاحقاً',
    awayTeamAr: 'يحدد لاحقاً',
    homeTeamFlag: getFlagUrl('to be decided'),
    awayTeamFlag: getFlagUrl('to be decided'),
    stadium: 'Hard Rock Stadium',
    stadiumAr: 'ملعب هارد روك',
    city: 'Miami',
    cityAr: 'ميامي',
    matchDate: '2026-07-18T16:00:00',
    image: 'https://images.unsplash.com/photo-1504153922511-dfb5af905b2a?w=800',
    description: 'Third Place Play-off',
    descriptionAr: 'مباراة المركز الثالث',
    stage: 'Third Place',
    stageAr: 'المركز الثالث',
    minPrice: 25,
    isActive: 1
  },
  {
    homeTeam: 'To Be Decided',
    awayTeam: 'To Be Decided',
    homeTeamAr: 'يحدد لاحقاً',
    awayTeamAr: 'يحدد لاحقاً',
    homeTeamFlag: getFlagUrl('to be decided'),
    awayTeamFlag: getFlagUrl('to be decided'),
    stadium: 'MetLife Stadium',
    stadiumAr: 'ملعب ميت لايف',
    city: 'New York',
    cityAr: 'نيويورك',
    matchDate: '2026-07-19T19:00:00',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
    description: 'World Cup Final',
    descriptionAr: 'النهائي الكبير لكأس العالم',
    stage: 'Final',
    stageAr: 'النهائي',
    minPrice: 25,
    isActive: 1
  }
    ];

    for (const match of matches) {
      await run(`
        INSERT INTO matches (
          home_team, away_team, home_team_ar, away_team_ar,
          home_team_flag, away_team_flag, stadium, stadium_ar,
          city, city_ar, match_date, image, description,
          description_ar, stage, stage_ar, min_price, is_active, available_percentage
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        match.homeTeam, match.awayTeam, match.homeTeamAr, match.awayTeamAr,
        match.homeTeamFlag, match.awayTeamFlag, match.stadium, match.stadiumAr,
        match.city, match.cityAr, match.matchDate, match.image, match.description,
        match.descriptionAr, match.stage, match.stageAr, match.minPrice, match.isActive, 100
      ]);
      console.log(`Inserted match: ${match.homeTeam} vs ${match.awayTeam}`);
    }

    // Insert sample tickets for first match
    const sections = ['A', 'B', 'C', 'D'];
    const rows = ['Row 1', 'Row 2', 'Row 3', 'Row 4', 'Row 5'];
    const categories = ['VIP', 'Premium', 'Standard', 'Economy'];
    const categoriesAr = ['VIP', 'مميز', 'قياسي', 'اقتصادي'];
    
    for (const section of sections) {
      for (const row of rows) {
        for (let i = 1; i <= 8; i++) {
          const categoryIndex = Math.floor(Math.random() * categories.length);
          const price = 150 + (categoryIndex * 50) + (Math.random() * 30);
          
          await run(`
            INSERT INTO tickets (match_id, category, category_ar, seat_number, section, row, price, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `, [1, categories[categoryIndex], categoriesAr[categoryIndex], `${section}${row}${i}`, section, row, price.toFixed(2), 'available']);
        }
      }
    }
    console.log('Inserted tickets for first match');

    // Insert sample posts
    const posts = [
      {
        title: 'World Cup 2026 Tickets Now Available',
        titleAr: 'تذاكر كأس العالم 2026 متاحة الآن',
        content: 'Get your tickets for the biggest football event in history. Early bird discounts available for limited time.',
        contentAr: 'احصل على تذاكرك لأكبر حدث كروي في التاريخ. خصومات مبكرة متاحة لفترة محدودة.',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
        isPublished: 1
      },
      {
        title: 'New Stadiums Revealed for 2026',
        titleAr: 'إعلان الملاعب الجديدة لعام 2026',
        content: 'FIFA has announced the state-of-the-art stadiums that will host the 2026 World Cup matches across North America.',
        contentAr: 'أعلنت الفيفا عن الملاعب الحديثة التي ستستضيف مباريات كأس العالم 2026 في أمريكا الشمالية.',
        image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800',
        isPublished: 1
      },
      {
        title: 'Ticket Sales Break Records',
        titleAr: 'مبيعات التذاكر تحطم الأرقام القياسية',
        content: 'Demand for World Cup 2026 tickets has exceeded all expectations, with millions of fans already securing their seats.',
        contentAr: 'تجاوز الطلب على تذاكر كأس العالم 2026 جميع التوقعات، حيث قام ملايين المشجعين بالفعل بحجز مقاعدهم.',
        image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
        isPublished: 1
      }
    ];

    for (const post of posts) {
      await run(`
        INSERT INTO posts (title, title_ar, content, content_ar, image, is_published)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [post.title, post.titleAr, post.content, post.contentAr, post.image, post.isPublished]);
      console.log(`Inserted post: ${post.title}`);
    }

    // Insert default settings
    await run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', ['payment_link', 'https://paymath.com']);
    console.log('Inserted default settings');

    // Insert default admin credentials
    const defaultPassword = process.env.ADMIN_PASSWORD || 'worldcup2026';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    await run('INSERT OR IGNORE INTO admin_credentials (username, password_hash) VALUES (?, ?)', ['admin', hashedPassword]);
    console.log('Inserted default admin credentials');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    db.close();
  }
}

seed();
