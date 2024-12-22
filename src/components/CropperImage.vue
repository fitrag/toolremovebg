<template>
    <div class="">
        <!-- <div class="xl:hidden mb-[6em] text-center">
            <p class="text-xl">
                Solusi cepat dan mudah untuk menghapus latar belakang foto Anda. <br/>
                Unggah gambar Anda dan dapatkan hasil yang bersih dan profesional <br/> dalam hitungan detik, tanpa perlu keahlian desain. <br/> Cocok untuk keperluan pribadi, bisnis, dan e-commerce.
            </p>
        </div> -->
        <div class="flex items-center justify-center px-10 py-10 sm:py-10 md:py-10 lg:py-10 xl:py-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
            <div class="w-[50%] mx-2">
                <div class="">
                    <div class="">
                        
                        <div v-if="isFilled == true">
                            <div class="flex flex-col bg-white w-[100%] p-2 xl:p-10 rounded-xl items-center text-black shadow-md">
                                <div class="relative border-dashed border-2 border-purple-400 p-10 text-center items-center flex flex-col text-center w-full h-full rounded-xl">
                                    <button class="bg-slate-100 absolute right-[-10px] top-[-10px] py-0 px-2 text-3xl font-bold rounded-full hover:bg-slate-300" @click="removeImage" style="z-index: 10;">&times;</button>
                                    <div v-if="isLoading == true && isFinish != true" class="bg-white opacity-75 absolute top-0 left-0 right-0 bottom-0 block flex h-100 items-center justify-center">
                                        <div class="loader"></div>
                                    </div>
                                    <cropper
                                        class="w-100 bg-white"
                                        :src="temporaryName"
                                        :auto-zoom="true"
                                        @change="change"
                                        ref="cropper"
                                    />
                                </div>
                                <div class="w-full mt-4">
                                    <button v-on:click="crop" class="bg-purple-500 text-white py-3 w-full text-center rounded font-semibold"><i class="pi pi-crop me-2"></i>Crop</button>
                                </div>
                            </div>
                        </div>

                        <div v-if="!isFilled">
                            <label for="file" name="file" class="flex flex-col bg-white w-[100%] p-2 xl:p-10 rounded-xl items-center text-black shadow-md">
                                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" hidden/>
                                <div class="border-dashed border-2 border-purple-400 px-10 py-7 text-center items-center flex flex-col text-center w-full h-full rounded-xl">
                                    <img :src="temporaryName" alt="" class="w-100">
                                    <i class="pi pi-cloud-upload text-purple-500 my-9" style="font-size: 6em;"></i>
                                    <div class="mt-[19px]">
                                        <span class="bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 px-8 block w-[450px] rounded-md text-lg text-white font-semibold">Pilih file</span>
                                    </div>
                                    <!-- <div class="mt-[16px] mb-[14px]">atau</div>
                                    <p class="text-slate-400">Seret berkas dari komputer</p> -->
                                </div>
                            </label>
                        </div>
                        <!-- <button v-on:click="submitFile()" class="bg-blue-400 text-white py-3 text-center w-full block mt-2 rounded font-semibold">Kirim</button> -->
                    </div>
                </div>
            </div>
            <div class="flex-1 mx-2">
                <div for="file" name="file" class="flex flex-col bg-white w-[100%] p-2 xl:p-10 rounded-xl items-center text-black shadow-md">
                    <div class="border-dashed border-2 border-purple-400 px-10 py-7 text-center items-center flex flex-col text-center w-full h-full rounded-xl">
                        <img :src="cropResult" class="w-100 h-[50%]">
                        <a :href="cropResult" class="bg-purple-400 text-white py-3 text-center w-full block mt-2 rounded font-semibold" v-bind:download="file ? file.name.split('.')[0]+`-hapuslatar.`+file.name.split('.')[1] : ''">Unduh Hasil</a>
                    </div>
                </div>
            </div>
            
        </div>

    </div>
  </template>
  
  <script>
  import { Cropper } from 'vue-advanced-cropper';

    export default {
    components: {
        Cropper,
	},
      data(){
        return {
            file: '',
            temporaryName:'',
            isFilled:false,
            isLoading:false,
            isFinish:false,
            isSuccess:false,
            host:window.location.hostname,
            title:'',
            keywords:'',
            coordinates: {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
            },
            cropResult:null    
        }
      },
  
    methods: {
        change({ coordinates, canvas }) {
			console.log(coordinates, canvas)
		},
        crop() {
			const { coordinates, canvas, } = this.$refs.cropper.getResult();
			this.coordinates = coordinates;
			this.cropResult = canvas.toDataURL();
		},
        removeImage(){
            this.temporaryName=''
            this.isFilled=false
            this.isFinish=false
        },
  
        handleFileUpload(){

            this.title = ''
            this.keywords = ''

            this.isFilled=true
            // this.isLoading=true
            this.file = this.$refs.file.files[0];
            this.temporaryName= URL.createObjectURL(this.file)
            }
      },
      created(){
        document.title = "HapusLatar by Fadila Fitra Kusuma Jaya"
      }
    }
  </script>
  <style>

.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid #514b82;
  animation:
    l20-1 0.8s infinite linear alternate,
    l20-2 1.6s infinite linear;
}
@keyframes l20-1{
   0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
   12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
   25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
   50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
   100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
}
@keyframes l20-2{ 
  0%    {transform:scaleY(1)  rotate(0deg)}
  49.99%{transform:scaleY(1)  rotate(135deg)}
  50%   {transform:scaleY(-1) rotate(0deg)}
  100%  {transform:scaleY(-1) rotate(-135deg)}
}</style>