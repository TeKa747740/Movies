const API_KEY = 'eae62805e81ccceef6046c841a23b424'; // ← استبدلها بمفتاحك من TMDB
const BASE_URL = 'https://api.themoviedb.org/3';
// تعريف IMAGE_BASE_URL ليستعمل في script.js
window.IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
// تعريف متغير المفتاح في window ليكون متاحًا في جميع الملفات
window.TMDB_API_KEY = 'eae62805e81ccceef6046c841a23b424';

// دالة لجلب أفلام شائعة
async function fetchPopularMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ar`);
  const data = await response.json();
  return data.results;
}

// دالة لعرض الأفلام في الواجهة
async function displayTMDBMovies() {
  const movies = await fetchPopularMovies();
  renderList("movies-container", movies);
}

// عند تحميل الصفحة نبدأ في عرض أفلام TMDB
window.addEventListener('DOMContentLoaded', displayTMDBMovies);
function goToTMDBDetails(movieId) {
  window.location.href = `details.html?tmdb_id=${movieId}`;
}
// جلب الأنمي (مسلسلات من نوع Animation)
async function fetchAnime() {
  const res = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&language=ar`);
  const data = await res.json();
  return data.results;
}

// عرض الأنمي
async function displayTMDBAnime() {
  const animeList = await fetchAnime();
  renderList("anime-container", animeList);
}
// جلب أفلام حسب النوع (مثلاً أكشن = 28)
async function fetchMoviesByGenre(genreId) {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=ar`);
  const data = await res.json();
  return data.results;
}

// عرض أفلام النوع المحدد
async function displayMoviesByGenre(genreId) {
  const genreMovies = await fetchMoviesByGenre(genreId);
  renderList("movies-container", genreMovies);
}

// دالة لإنشاء كارت فيلم أو مسلسل مع صورة افتراضية عند غياب الصورة
function createCardFromTMDB(item, type) {
  const defaultPoster = "https://via.placeholder.com/400x600?text=No+Image";
  let imgSrc = defaultPoster;
  if (item.poster_path) {
    imgSrc = IMAGE_BASE_URL + item.poster_path;
  } else if (item.backdrop_path) {
    imgSrc = IMAGE_BASE_URL + item.backdrop_path;
  }
  const title = item.title || item.name || "بدون عنوان";
  const rating = item.vote_average ? (item.vote_average + "/10 ⭐") : "بدون تقييم";
  const id = item.id;
  // إذا كان العنصر فيلم (movie) أو لم يُحدد النوع، مرر دومًا type=movie
  let typeParam = type === 'tv' ? 'tv' : 'movie';
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.innerHTML = `
    <img src="${imgSrc}" alt="${title}" onerror="this.src='${defaultPoster}'">
    <h3>${title}</h3>
    <p>${rating}</p>
    <button onclick="goToTMDBOrLocalDetails(${id}, '${typeParam}')">شاهد الآن</button>
  `;
  return card;
}

// دالة لجلب أفلام مع جميع الحقول (العنوان، الصورة، التقييم، الوصف، الكاست)
async function fetchFullMoviesFromTMDB(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ar&page=${page}`);
  const data = await res.json();
  const movies = await Promise.all(data.results.map(async movie => {
    // جلب الكاست
    const creditsRes = await fetch(`${BASE_URL}/movie/${movie.id}/credits?api_key=${API_KEY}&language=ar`);
    const credits = await creditsRes.json();
    return {
      title: movie.title,
      rating: movie.vote_average ? movie.vote_average + "/10" : "غير معروف",
      image: movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : "https://via.placeholder.com/400x600?text=No+Image",
      description: movie.overview || "لا يوجد وصف.",
      watchLink: `details.html?tmdb_id=${movie.id}&type=movie`,
      downloadLink: `https://www.themoviedb.org/movie/${movie.id}`,
      cast: (credits.cast || []).slice(0, 8).map(member => ({
        name: member.name,
        character: member.character,
        image: member.profile_path ? IMAGE_BASE_URL + member.profile_path : "https://via.placeholder.com/200x300?text=No+Image"
      }))
    };
  }));
  return movies;
}

// دالة لجلب مسلسلات مع جميع الحقول
async function fetchFullSeriesFromTMDB(page = 1) {
  const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=ar&page=${page}`);
  const data = await res.json();
  const series = await Promise.all(data.results.map(async show => {
    const creditsRes = await fetch(`${BASE_URL}/tv/${show.id}/credits?api_key=${API_KEY}&language=ar`);
    const credits = await creditsRes.json();
    return {
      title: show.name,
      rating: show.vote_average ? show.vote_average + "/10" : "غير معروف",
      image: show.poster_path ? IMAGE_BASE_URL + show.poster_path : "https://via.placeholder.com/400x600?text=No+Image",
      description: show.overview || "لا يوجد وصف.",
      watchLink: `details.html?tmdb_id=${show.id}&type=tv`,
      downloadLink: `https://www.themoviedb.org/tv/${show.id}`,
      cast: (credits.cast || []).slice(0, 8).map(member => ({
        name: member.name,
        character: member.character,
        image: member.profile_path ? IMAGE_BASE_URL + member.profile_path : "https://via.placeholder.com/200x300?text=No+Image"
      }))
    };
  }));
  return series;
}

// دالة لجلب أنمي (مسلسلات أنمي)
async function fetchFullAnimeFromTMDB(page = 1) {
  const res = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&language=ar&page=${page}`);
  const data = await res.json();
  const anime = await Promise.all(data.results.map(async show => {
    const creditsRes = await fetch(`${BASE_URL}/tv/${show.id}/credits?api_key=${API_KEY}&language=ar`);
    const credits = await creditsRes.json();
    return {
      title: show.name,
      rating: show.vote_average ? show.vote_average + "/10" : "غير معروف",
      image: show.poster_path ? IMAGE_BASE_URL + show.poster_path : "https://via.placeholder.com/400x600?text=No+Image",
      description: show.overview || "لا يوجد وصف.",
      watchLink: `details.html?tmdb_id=${show.id}&type=tv`,
      downloadLink: `https://www.themoviedb.org/tv/${show.id}`,
      cast: (credits.cast || []).slice(0, 8).map(member => ({
        name: member.name,
        character: member.character,
        image: member.profile_path ? IMAGE_BASE_URL + member.profile_path : "https://via.placeholder.com/200x300?text=No+Image"
      }))
    };
  }));
  return anime;
}

// دالة لجلب أحدث الأفلام (جديدة) مع جميع التفاصيل
async function fetchLatestMoviesFromTMDB(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ar&page=${page}`);
  const data = await res.json();
  const movies = await Promise.all(data.results.map(async movie => {
    const creditsRes = await fetch(`${BASE_URL}/movie/${movie.id}/credits?api_key=${API_KEY}&language=ar`);
    const credits = await creditsRes.json();
    return {
      title: movie.title,
      rating: movie.vote_average ? movie.vote_average + "/10" : "غير معروف",
      image: movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : "https://via.placeholder.com/400x600?text=No+Image",
      description: movie.overview || "لا يوجد وصف.",
      watchLink: `details.html?tmdb_id=${movie.id}&type=movie`,
      downloadLink: `https://www.themoviedb.org/movie/${movie.id}`,
      cast: (credits.cast || []).slice(0, 8).map(member => ({
        name: member.name,
        character: member.character,
        image: member.profile_path ? IMAGE_BASE_URL + member.profile_path : "https://via.placeholder.com/200x300?text=No+Image"
      }))
    };
  }));
  return movies;
}

// دالة لجلب عدة صفحات من أحدث الأفلام
async function fetchLatestMultiplePages(totalPages = 3) {
  return await fetchMultiplePages(fetchLatestMoviesFromTMDB, totalPages);
}

// دالة لجلب عدة صفحات ودمج النتائج لأي نوع (أفلام/مسلسلات/أنمي)
async function fetchMultiplePages(fetchFunc, totalPages = 3) {
  let allResults = [];
  for (let page = 1; page <= totalPages; page++) {
    const results = await fetchFunc(page);
    allResults = allResults.concat(results);
  }
  return allResults;
}

// مثال: جلب 3 صفحات (60 فيلم/مسلسل/أنمي)
// const movies = await fetchMultiplePages(fetchFullMoviesFromTMDB, 3);
// const series = await fetchMultiplePages(fetchFullSeriesFromTMDB, 3);
// const anime = await fetchMultiplePages(fetchFullAnimeFromTMDB, 3);
// جلب أفلام جديدة (now playing)
async function fetchNowPlayingMovies() {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ar`);
  const data = await res.json();
  return data.results;
}

// عرض أفلام جديدة في الواجهة
async function displayNowPlayingMovies() {
  const movies = await fetchNowPlayingMovies();
  const container = document.getElementById('now-playing-container');
  container.innerHTML = '';

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.vote_average}/10 ⭐</p>
      <button onclick="goToTMDBDetails(${movie.id})">شاهد الآن</button>
    `;
    container.appendChild(card);
  });
}

// عند تحميل الصفحة نبدأ في عرض أفلام TMDB
window.addEventListener('DOMContentLoaded', displayTMDBMovies);
function goToTMDBDetails(movieId) {
  window.location.href = `details.html?tmdb_id=${movieId}`;
}
// جلب الأنمي (مسلسلات من نوع Animation)
async function fetchAnime() {
  const res = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&language=ar`);
  const data = await res.json();
  return data.results;
}

// عرض الأنمي
async function displayTMDBAnime() {
  const animeList = await fetchAnime();
  renderList("anime-container", animeList);
}
// جلب أفلام حسب النوع (مثلاً أكشن = 28)
async function fetchMoviesByGenre(genreId) {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=ar`);
  const data = await res.json();
  return data.results;
}

// عرض أفلام النوع المحدد
async function displayMoviesByGenre(genreId) {
  const genreMovies = await fetchMoviesByGenre(genreId);
  renderList("movies-container", genreMovies);
}

// دالة لإنشاء كارت فيلم أو مسلسل مع صورة افتراضية عند غياب الصورة
function createCardFromTMDB(item, type) {
  const defaultPoster = "https://via.placeholder.com/400x600?text=No+Image";
  let imgSrc = defaultPoster;
  if (item.poster_path) {
    imgSrc = IMAGE_BASE_URL + item.poster_path;
  } else if (item.backdrop_path) {
    imgSrc = IMAGE_BASE_URL + item.backdrop_path;
  }
  const title = item.title || item.name || "بدون عنوان";
  const rating = item.vote_average ? (item.vote_average + "/10 ⭐") : "بدون تقييم";
  const id = item.id;
  // إذا كان العنصر فيلم (movie) أو لم يُحدد النوع، مرر دومًا type=movie
  let typeParam = type === 'tv' ? 'tv' : 'movie';
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.innerHTML = `
    <img src="${imgSrc}" alt="${title}" onerror="this.src='${defaultPoster}'">
    <h3>${title}</h3>
    <p>${rating}</p>
    <button onclick="goToTMDBOrLocalDetails(${id}, '${typeParam}')">شاهد الآن</button>
  `;
  return card;
}

// دالة لجلب أفلام مع جميع الحقول (العنوان، الصورة، التقييم، الوصف، الكاست)
async function fetchFullMoviesFromTMDB(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ar&page=${page}`);
  const data = await res.json();
  const movies = await Promise.all(data.results.map(async movie => {
    // جلب الكاست
    const creditsRes = await fetch(`${BASE_URL}/movie/${movie.id}/credits?api_key=${API_KEY}&language=ar`);
    const credits = await creditsRes.json();
    return {
      title: movie.title,
      rating: movie.vote_average ? movie.vote_average + "/10" : "غير معروف",
      image: movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : "https://via.placeholder.com/400x600?text=No+Image",
      description: movie.overview || "لا يوجد وصف.",
      watchLink: `details.html?tmdb_id=${movie.id}&type=movie`,
      downloadLink: `https://www.themoviedb.org/movie/${movie.id}`,
      cast: (credits.cast || []).slice(0, 8).map(member => ({
        name: member.name,
        character: member.character,
        image: member.profile_path ? IMAGE_BASE_URL + member.profile_path : "https://via.placeholder.com/200x300?text=No+Image"
      }))
    };
  }));
  return movies;
}

// دالة لجلب مسلسلات مع جميع الحقول
async function fetchFullSeriesFromTMDB(page = 1) {
  const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=ar&page=${page}`);
  const data = await res.json();
  const series = await Promise.all(data.results.map(async show => {
    const creditsRes = await fetch(`${BASE_URL}/tv/${show.id}/credits?api_key=${API_KEY}&language=ar`);
    const credits = await creditsRes.json();
    return {
      title: show.name,
      rating: show.vote_average ? show.vote_average + "/10" : "غير معروف",
      image: show.poster_path ? IMAGE_BASE_URL + show.poster_path : "https://via.placeholder.com/400x600?text=No+Image",
      description: show.overview || "لا يوجد وصف.",
      watchLink: `details.html?tmdb_id=${show.id}&type=tv`,
      downloadLink: `https://www.themoviedb.org/tv/${show.id}`,
      cast: (credits.cast || []).slice(0, 8).map(member => ({
        name: member.name,
        character: member.character,
        image: member.profile_path ? IMAGE_BASE_URL + member.profile_path : "https://via.placeholder.com/200x300?text=No+Image"
      }))
    };
  }));
  return series;
}

// دالة لجلب أنمي (مسلسلات أنمي)
async function fetchFullAnimeFromTMDB(page = 1) {
  const res = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&language=ar&page=${page}`);
  const data = await res.json();
  const anime = await Promise.all(data.results.map(async show => {
    const creditsRes = await fetch(`${BASE_URL}/tv/${show.id}/credits?api_key=${API_KEY}&language=ar`);
    const credits = await creditsRes.json();
    return {
      title: show.name,
      rating: show.vote_average ? show.vote_average + "/10" : "غير معروف",
      image: show.poster_path ? IMAGE_BASE_URL + show.poster_path : "https://via.placeholder.com/400x600?text=No+Image",
      description: show.overview || "لا يوجد وصف.",
      watchLink: `details.html?tmdb_id=${show.id}&type=tv`,
      downloadLink: `https://www.themoviedb.org/tv/${show.id}`,
      cast: (credits.cast || []).slice(0, 8).map(member => ({
        name: member.name,
        character: member.character,
        image: member.profile_path ? IMAGE_BASE_URL + member.profile_path : "https://via.placeholder.com/200x300?text=No+Image"
      }))
    };
  }));
  return anime;
}

// دالة لجلب أحدث الأفلام (جديدة) مع جميع التفاصيل
async function fetchLatestMoviesFromTMDB(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ar&page=${page}`);
  const data = await res.json();
  const movies = await Promise.all(data.results.map(async movie => {
    const creditsRes = await fetch(`${BASE_URL}/movie/${movie.id}/credits?api_key=${API_KEY}&language=ar`);
    const credits = await creditsRes.json();
    return {
      title: movie.title,
      rating: movie.vote_average ? movie.vote_average + "/10" : "غير معروف",
      image: movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : "https://via.placeholder.com/400x600?text=No+Image",
      description: movie.overview || "لا يوجد وصف.",
      watchLink: `details.html?tmdb_id=${movie.id}&type=movie`,
      downloadLink: `https://www.themoviedb.org/movie/${movie.id}`,
      cast: (credits.cast || []).slice(0, 8).map(member => ({
        name: member.name,
        character: member.character,
        image: member.profile_path ? IMAGE_BASE_URL + member.profile_path : "https://via.placeholder.com/200x300?text=No+Image"
      }))
    };
  }));
  return movies;
}

// دالة لجلب عدة صفحات من أحدث الأفلام
async function fetchLatestMultiplePages(totalPages = 3) {
  return await fetchMultiplePages(fetchLatestMoviesFromTMDB, totalPages);
}

// دالة لجلب عدة صفحات ودمج النتائج لأي نوع (أفلام/مسلسلات/أنمي)
async function fetchMultiplePages(fetchFunc, totalPages = 3) {
  let allResults = [];
  for (let page = 1; page <= totalPages; page++) {
    const results = await fetchFunc(page);
    allResults = allResults.concat(results);
  }
  return allResults;
}

// مثال: جلب 3 صفحات (60 فيلم/مسلسل/أنمي)
// const movies = await fetchMultiplePages(fetchFullMoviesFromTMDB, 3);
// const series = await fetchMultiplePages(fetchFullSeriesFromTMDB, 3);
// const anime = await fetchMultiplePages(fetchFullAnimeFromTMDB, 3);
// دالة موحدة للتوجيه إلى التفاصيل حسب نوع العنصر
function goToTMDBOrLocalDetails(id, type) {
  if (id) {
    if (type === 'tv') {
      window.location.href = `details.html?tmdb_id=${id}&type=tv`;
    } else {
      // دومًا مرر type=movie لأي شيء غير tv
      window.location.href = `details.html?tmdb_id=${id}&type=movie`;
    }
  }
}

