// ✅ حفظ مفتاح TMDB تلقائياً من localStorage فقط (بدون prompt)
(function ensureTMDBKey() {
  if (!window.TMDB_API_KEY) {
    const savedKey = localStorage.getItem('TMDB_API_KEY');
    if (savedKey) {
      window.TMDB_API_KEY = savedKey;
    }
    // لا prompt أبداً
  }
})();

// ✅ قائمة الأفلام
const movies = [
  {
  title: "Diablo 2025",
  rating: "7.2/10",
  category: "أكشن",
  image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/qhHXBt9y24YHJOkmtfsmB7JtTBp.jpg",
  description: "محارب شجاع يواجه قوى جهنمية لإنقاذ البشرية من الدمار.",
  watchLink: "https://example.com/watch/diablo-2025",
  downloadLink: "https://example.com/download/diablo-2025",
  cast: [
    {
      name: "Ben Affleck",
      character: "Christian Wolff",
      image: "https://image.tmdb.org/t/p/w500/2G8zV7JtlC2kzOKAqJ5aFW3B2mc.jpg"
    },
    {
      name: "Jon Bernthal",
      character: "Braxton",
      image: "https://image.tmdb.org/t/p/w500/zwXK0A44Dbz3YslkSxoR0qYKvRk.jpg"
    }
  ]
}
,
  {
  title: "STRAW (2025)",
  rating: "6.9/10",
  category: "خيال علمي",
  image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/mQKjL7w7SNSEXTriYV1GHTV3W5p.jpg",
  description: "في عالم مستقبلي، يكتشف رجل قدرته على تغيير الواقع باستخدام قشة سحرية.",
  watchLink: "https://example.com/watch/straw-2025",
  downloadLink: "https://example.com/download/straw-2025"
},
  {
    title: "Final Destination Bloodlines 2025",
    rating: "7/10",
    category: "رعب",
    image: "https://image.tmdb.org/t/p/w500/8QVDXDiOGHRcAD4oM6MXjE0osSj.jpg",
    description: "سلسلة الرعب تعود في جزء جديد مليء بالإثارة والحوادث.",
    watchLink: "https://example.com/watch/final-destination",
    downloadLink: "https://example.com/download/final-destination"
  },
  {
    title: "How to Train Your Dragon",
    rating: "8/10",
    category: "خيال علمي",
    image: "https://image.tmdb.org/t/p/w500/ygO9lowFMXWymATCrhoQXd6gCEh.jpg",
    description: "قصة شاب وتنينه في مغامرة مليئة بالمشاعر والمخاطر.",
    watchLink: "https://example.com/watch/train-dragon",
    downloadLink: "https://example.com/download/train-dragon"
  },
  {
    title: "Avatar 3",
    rating: "9/10",
    category: "خيال علمي",
    image: "https://image.tmdb.org/t/p/w500/kU3B75TyRiCgE270EyZnHjfivoq.jpg",
    description: "العودة إلى كوكب باندورا في مغامرة بصرية ساحرة.",
    watchLink: "https://example.com/watch/avatar3",
    downloadLink: "https://example.com/download/avatar3"
  },
  {
    title: "Oppenheimer",
    rating: "9.3/10",
    category: "دراما",
    image: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
    description: "سيرة ذاتية للمخترع وراء القنبلة الذرية.",
    watchLink: "https://example.com/watch/oppenheimer",
    downloadLink: "https://example.com/download/oppenheimer"
  },
  {
    title: "The Batman",
    rating: "8.5/10",
    category: "أكشن",
    image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    description: "باتمان يواجه الجريمة في مدينة غوثام بأسلوب مظلم.",
    watchLink: "https://example.com/watch/batman",
    downloadLink: "https://example.com/download/batman"
  },
  {
    title: "John Wick 4",
    rating: "8.9/10",
    category: "أكشن",
    image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    description: "جون ويك يعود لمواجهة منظمة القتلة في معركة لا ترحم.",
    watchLink: "https://example.com/watch/john-wick4",
    downloadLink: "https://example.com/download/john-wick4"
  },
  {
    title: "Fast X",
    rating: "7.5/10",
    category: "أكشن",
    image: "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
    description: "السرعة تعود مجددًا مع دومينيك وعائلته.",
    watchLink: "https://example.com/watch/fast-x",
    downloadLink: "https://example.com/download/fast-x"
  },
  {
    title: "Black Panther: Wakanda Forever",
    rating: "7.8/10",
    category: "خيال علمي",
    image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/3d10lpRDUt202g50a6G7pJngEGS.jpg",
    description: "واكاندا تواجه خطرًا عالميًا بعد وفاة الملك تشالا.",
    watchLink: "https://example.com/watch/wakanda",
    downloadLink: "https://example.com/download/wakanda"
  },
  {
    title: "Doctor Strange in the Multiverse",
    rating: "7.0/10",
    category: "خيال علمي",
    image: "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
    description: "دكتور سترينج يخوض مغامرة جديدة عبر الأكوان المتعددة.",
    watchLink: "https://example.com/watch/doctor-strange",
    downloadLink: "https://example.com/download/doctor-strange"
  },
{
    title: "How to Train Your Dragon (2025)",
    rating: "8.1/10",
    category: "خيال علمي",
    image: "https://image.tmdb.org/t/p/w500/ygO9lowFMXWymATCrhoQXd6gCEh.jpg",
    description: "الجزء الجديد من مغامرة هيكاب وتنينه في أرض جديدة مليئة بالتحديات.",
    watchLink: "https://example.com/watch/train-dragon-2025",
    downloadLink: "https://example.com/download/train-dragon-2025"
  },
  {
    title: "Distant",
    rating: "6.8/10",
    category: "خيال علمي",
    image: "https://media.themoviedb.org/t/p/w220_and_h330_face/czh8HOhsbBUKoKsmRmLQMCLHUev.jpg",
    description: "رائد فضاء يجد نفسه وحيدًا على كوكب بعيد ويقاتل من أجل البقاء.",
    watchLink: "https://example.com/watch/distant",
    downloadLink: "https://example.com/download/distant"
  },
  {
    title: "The Amateur",
    rating: "6.5/10",
    category: "أكشن",
    image: "https://media.themoviedb.org/t/p/w220_and_h330_face/SNEoUInCa5fAgwuEBMIMBGvkkh.jpg",
    description: "عميل مبتدئ ينغمس في مؤامرة دولية ويصبح مطاردًا من كل الجهات.",
    watchLink: "https://example.com/watch/the-amateur",
    downloadLink: "https://example.com/download/the-amateur"
  },
  {
    title: "Crazy Lizard",
    rating: "6.2/10",
    category: "مغامرة",
    image: "https://media.themoviedb.org/t/p/w220_and_h330_face/9TFaFsSXedaALXTzba349euDeoY.jpg",
    description: "سحلية خارقة تبدأ رحلة عبر المدن لإنقاذ بيئتها من البشر.",
    watchLink: "https://example.com/watch/crazy-lizard",
    downloadLink: "https://example.com/download/crazy-lizard"
  },
  {
    title: "Candle in the Tomb: The Worm Valley",
    rating: "7.0/10",
    category: "مغامرة",
    image: "https://media.themoviedb.org/t/p/w220_and_h330_face/7Hk1qxAvZi9H9cfBb4iHkoGjapH.jpg",
    description: "فريق يستكشف واديًا غامضًا مليئًا بالوحوش والكنوز الملعونة.",
    watchLink: "https://example.com/watch/candle-in-the-tomb",
    downloadLink: "https://example.com/download/candle-in-the-tomb"
  },
  {
    title: "Hunt the Wicked",
    rating: "7.3/10",
    category: "أكشن",
    image: "https://media.themoviedb.org/t/p/w220_and_h330_face/m5UBHbEjQJx3AkRZWRY6A4l4ZDT.jpg",
    description: "قاتل مأجور سابق يعود للانتقام من منظمة ظلمته.",
    watchLink: "https://example.com/watch/hunt-the-wicked",
    downloadLink: "https://example.com/download/hunt-the-wicked"
  }
];

// ✅ قائمة المسلسلات
const series = [
  {
    title: "Breaking Bad",
    rating: "9.5/10",
    image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
    description: "مدرس كيمياء يتحول إلى أكبر تاجر مخدرات.",
    watchLink: "https://example.com/watch/breaking-bad",
    downloadLink: "https://example.com/download/breaking-bad"
  },
  {
    title: "Stranger Things",
    rating: "8.7/10",
    image: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
    description: "مجموعة أطفال يكتشفون عالمًا مقلوبًا مليئًا بالغموض.",
    watchLink: "https://example.com/watch/stranger-things",
    downloadLink: "https://example.com/download/stranger-things"
  },
  {
    title: "The Last of Us",
    rating: "9.0/10",
    image: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    description: "بعد انتشار وباء قاتل، رجل يحمي فتاة قد تكون الأمل للبشرية.",
    watchLink: "https://example.com/watch/last-of-us",
    downloadLink: "https://example.com/download/last-of-us"
  }
];

// قائمة المسلسلات الأجنبية فقط
const foreignSeries = [
  {
    title: "Breaking Bad",
    rating: "9.5/10",
    image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
    description: "مدرس كيمياء يتحول إلى أكبر تاجر مخدرات.",
    watchLink: "https://example.com/watch/breaking-bad",
    downloadLink: "https://example.com/download/breaking-bad",
    nationality: "أجنبي"
  },
  {
    title: "Stranger Things",
    rating: "8.7/10",
    image: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
    description: "مجموعة أطفال يكتشفون عالمًا مقلوبًا مليئًا بالغموض.",
    watchLink: "https://example.com/watch/stranger-things",
    downloadLink: "https://example.com/download/stranger-things",
    nationality: "أجنبي"
  },
  {
    title: "The Last of Us",
    rating: "9.0/10",
    image: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    description: "بعد انتشار وباء قاتل، رجل يحمي فتاة قد تكون الأمل للبشرية.",
    watchLink: "https://example.com/watch/last-of-us",
    downloadLink: "https://example.com/download/last-of-us",
    nationality: "أجنبي"
  },
  {
    title: "Game of Thrones",
    rating: "9.3/10",
    image: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
    description: "صراع العروش على الممالك السبع.",
    watchLink: "https://example.com/watch/got",
    downloadLink: "https://example.com/download/got",
    nationality: "أجنبي"
  },
  {
    title: "Money Heist",
    rating: "8.2/10",
    image: "https://image.tmdb.org/t/p/w500/mo0FP1GxOFZT4UDde7RFDz5APXF.jpg",
    description: "مجموعة لصوص يخططون لأكبر سرقة في التاريخ.",
    watchLink: "https://example.com/watch/money-heist",
    downloadLink: "https://example.com/download/money-heist",
    nationality: "أجنبي"
  },
  {
    title: "Peaky Blinders",
    rating: "8.8/10",
    image: "https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg",
    description: "عصابة بيكي بلايندرز في برمنغهام.",
    watchLink: "https://example.com/watch/peaky-blinders",
    downloadLink: "https://example.com/download/peaky-blinders",
    nationality: "أجنبي"
  }
];

// قائمة المسلسلات المصرية فقط
const egyptianSeries = [
  {
    title: "الاختيار",
    rating: "9.2/10",
    image: "https://upload.wikimedia.org/wikipedia/ar/2/2e/Al_Ekhtiar_S1_Poster.jpg",
    poster: "https://upload.wikimedia.org/wikipedia/ar/2/2e/Al_Ekhtiar_S1_Poster.jpg",
    description: "قصة حقيقية عن بطولات الجيش المصري.",
    watchLink: "https://www.example.com/watch/elkhtyar",
    downloadLink: "https://www.example.com/download/elkhtyar",
    nationality: "مصري"
  },
  {
    title: "البرنس",
    rating: "8.7/10",
    image: "https://upload.wikimedia.org/wikipedia/ar/6/6e/El-Prince-Poster.jpg",
    poster: "https://upload.wikimedia.org/wikipedia/ar/6/6e/El-Prince-Poster.jpg",
    description: "دراما اجتماعية عن عائلة البرنس.",
    watchLink: "https://www.example.com/watch/elprince",
    downloadLink: "https://www.example.com/download/elprince",
    nationality: "مصري"
  },
  {
    title: "جعفر العمدة",
    rating: "8.9/10",
    image: "https://i.imgur.com/0Q9Z1ZB.jpg", // صورة مؤقتة، يمكن استبدالها لاحقاً بصورة رسمية
    poster: "https://i.imgur.com/0Q9Z1ZB.jpg",
    description: "قصة رجل أعمال يواجه تحديات كبيرة.",
    watchLink: "https://www.example.com/watch/gaafar",
    downloadLink: "https://www.example.com/download/gaafar",
    nationality: "مصري"
  },
  {
    title: "الكبير أوي",
    rating: "9.0/10",
    image: "https://upload.wikimedia.org/wikipedia/ar/7/7e/ElKebeerAwyS6Poster.jpg",
    poster: "https://upload.wikimedia.org/wikipedia/ar/7/7e/ElKebeerAwyS6Poster.jpg",
    description: "كوميديا عن الكبير وعائلته في المزاريطة.",
    watchLink: "https://www.example.com/watch/elkbeer",
    downloadLink: "https://www.example.com/download/elkbeer",
    nationality: "مصري"
  }
];

// ✅ إنشاء بطاقة فيلم/مسلسل/أنمي
// دالة إنشاء كارت موحدة تعرض كل التفاصيل من TMDB
function createCard(item) {
  const defaultPoster = "https://via.placeholder.com/400x600?text=No+Image";
  let imgSrc = defaultPoster;

  // الأولوية: poster ثم image ثم الافتراضية
  if (item.poster) {
    imgSrc = item.poster;
  } else if (item.image) {
    imgSrc = item.image;
  }

  if (item.nationality === "مصري") {
    console.log("[Egyptian Series Poster]", item.title, imgSrc);
  }

  const title = item.title || item.name || '';
  const rating = item.vote_average
    ? (item.vote_average + '/10 ⭐')
    : (item.rating ? item.rating + ' ⭐' : 'بدون تقييم');

  // منطق موحد لتحديد TMDB (يجب أن يكون id أو tmdb_id رقم صحيح فقط)
  const isTMDB = (
    (Number.isInteger(item.id) && item.id > 0) ||
    (Number.isInteger(item.tmdb_id) && item.tmdb_id > 0)
  ) && !(item.nationality === "أجنبي" || item.nationality === "مصري");

  const card = document.createElement("div");
  card.className = "movie-card";

  // صورة TMDB أو محلية
  const tmdbImg = item.poster_path ? (window.IMAGE_BASE_URL ? window.IMAGE_BASE_URL + item.poster_path : 'https://image.tmdb.org/t/p/w500' + item.poster_path) : imgSrc;

  const img = document.createElement('img');
  img.src = tmdbImg;
  img.alt = title;
  img.onerror = function() { this.src = defaultPoster; };
  const h3 = document.createElement('h3');
  h3.textContent = title;
  const p = document.createElement('p');
  p.textContent = rating;
  const btn = document.createElement('button');
  btn.textContent = 'شاهد الآن';

  btn.addEventListener('click', function(e) {
    e.preventDefault();
    let watch = item.watchLink || '';
    let download = item.downloadLink || '';
    // إذا كان TMDB
    if (isTMDB) {
      if (window.TMDB_API_KEY) {
        const params = [
          `tmdb_id=${encodeURIComponent(item.id || item.tmdb_id || '')}`,
          `title=${encodeURIComponent(title)}`,
          `rating=${encodeURIComponent(item.vote_average ? (item.vote_average + '/10') : (item.rating || ''))}`,
          `image=${encodeURIComponent(tmdbImg)}`,
          `description=${encodeURIComponent(item.description || item.overview || '')}`,
          `watchLink=${encodeURIComponent(watch)}`,
          `downloadLink=${encodeURIComponent(download)}`
        ];
        if (item.cast) {
          params.push(`cast=${encodeURIComponent(JSON.stringify(item.cast))}`);
        }
        window.location.href = 'details.html?' + params.join('&');
      } else {
        alert('لا يمكن عرض التفاصيل بدون مفتاح TMDB. يرجى ضبط المفتاح في الإعدادات.');
      }
    } else {
      let url = `details.html?title=${encodeURIComponent(item.title || '')}` +
        `&rating=${encodeURIComponent(item.rating || '')}` +
        `&image=${encodeURIComponent(item.image || item.poster || '')}` +
        `&description=${encodeURIComponent(item.description || '')}` +
        `&watchLink=${encodeURIComponent(watch)}` +
        `&downloadLink=${encodeURIComponent(download)}`;
      if (item.cast) {
        url += `&cast=${encodeURIComponent(JSON.stringify(item.cast))}`;
      }
      window.location.href = url;
    }
  });

  card.appendChild(img);
  card.appendChild(h3);
  card.appendChild(p);
  card.appendChild(btn);

  return card;
}

// ✅ جلب وعرض عدد كبير من النتائج تلقائيًا عند تحميل الصفحة الرئيسية
async function loadManyFromTMDB() {
  // جلب نتائج TMDB
  const [tmdbMovies, tmdbSeries, tmdbAnime] = await Promise.all([
    fetchMultiplePages(fetchFullMoviesFromTMDB, 3),
    fetchMultiplePages(fetchFullSeriesFromTMDB, 3),
    fetchMultiplePages(fetchFullAnimeFromTMDB, 3)
  ]);
  // دمج النتائج المحلية مع TMDB
  const allMovies = movies.concat(tmdbMovies);
  const allSeries = (typeof foreignSeries !== 'undefined' ? foreignSeries : []).concat(tmdbSeries);
  const allAnime = (typeof anime !== 'undefined' ? anime : []).concat(tmdbAnime);
  if (typeof renderList === 'function') {
    renderList("movies-container", allMovies);
    renderList("series-container", allSeries);
    renderList("anime-container", allAnime);
  }
}
// ✅ عند تحميل الصفحة الرئيسية، اعرض النتائج
window.addEventListener('DOMContentLoaded', loadManyFromTMDB);



