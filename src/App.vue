<template>
  <div id="app">
    <header class="py-5 px-8 shadow flex justify-between items-center flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row">
      <div class="brand">
          <a href="" class="font-bold text-3xl">Hapus<span class="text-purple-500">Latar</span><span class="text-sm">By Fadila Fitra {{ host }}</span></a>
      </div>
      <div class="nav mt-[40px] sm:mt-[40px] md:mt-[40px] lg:mt-[40px] xl:mt-0">
          <ul class="list-style-none">
              <li class="float-left mx-2"><router-link to="/">Home</router-link></li>
              <li class="float-left mx-2">Multiple Eraser</li>
              <li class="float-left mx-2"><router-link to="/image-keyword">Image Keyword Tool</router-link></li>
              <li class="float-left mx-2"><router-link to="/keyword-tool">Keyword Tool</router-link></li>
              <li class="float-left mx-2"><router-link to="/keyword-tool">Pricing</router-link></li>
              <li class="float-left mx-2"><a href="" class="bg-purple-500 p-3 rounded-lg text-white">JOIN PRO<i class="pi pi-crown ms-2 text-yellow-400"></i></a></li>
          </ul>
      </div>
    </header>
    <router-view/>
    <footer class="bg-black text-white text-center">
      <div class="py-5 px-10">
        Made with ❤️ by Fadila Fitra Kusuma Jaya
      </div>
    </footer>
  </div>
</template>
