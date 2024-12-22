<template>
    <div class="">
        <div class="flex flex-col xl:flex-row items-center justify-center px-10 py-10 sm:py-10 md:py-10 lg:py-10 xl:py-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
            <div class="flex-auto">
                <div class="flex justfy-center items-center flex-col xl:my-10 lg:my-2 px-[40px]">
                    <div class="sm:flex md:flex lg:flex flex-col items-center justify-center">
                        <div class="xl:hidden mb-[6em] text-center">
                            <p class="text-xl">
                                Solusi cepat dan mudah untuk menghapus latar belakang foto Anda. <br/>
                                Unggah gambar Anda dan dapatkan hasil yang bersih dan profesional <br/> dalam hitungan detik, tanpa perlu keahlian desain. <br/> Cocok untuk keperluan pribadi, bisnis, dan e-commerce.
                            </p>
                        </div>
                        
                        <div v-if="isFilled == true">
                            <div class="flex flex-col bg-white w-[100%] xl:w-[600px] p-2 xl:p-10 rounded-xl items-center text-black shadow-md">
                                <div class="relative border-dashed border-2 border-purple-400 p-10 text-center items-center flex flex-col text-center w-full h-full rounded-xl">
                                    <button class="bg-slate-100 absolute right-[-10px] top-[-10px] py-0 px-2 text-3xl font-bold rounded-full hover:bg-slate-300" @click="removeImage" style="z-index: 10;">&times;</button>
                                    <div v-if="isLoading == true && isFinish != true" class="bg-white opacity-75 absolute top-0 left-0 right-0 bottom-0 block flex h-100 items-center justify-center">
                                        <div class="loader"></div>
                                    </div>
                                    <img :src="temporaryName" alt="" class="w-100">
                                </div>
                            </div>
                        </div>

                        <div v-if="!isFilled">
                            <label for="file" name="file" class="flex flex-col bg-white w-[100%] xl:w-[600px] p-2 xl:p-10 rounded-xl items-center text-black shadow-md">
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
            <div class="w-full xl:w-[50%]">
                <div class="flex flex-col bg-white p-10 rounded-xl mt-6 text-black shadow-md">
                    <div class="mb-2">
                        <label for="" class="mb-2 block font-semibold">Judul</label>
                        <input type="text" v-model="title" class="block p-4 w-full border-2 border-gray-200 rounded-lg focus:outline-none">
                    </div>
                    <div class="mb-2">
                        <label for="" class="mb-2 block font-semibold">Keywords</label>
                        <textarea v-model="keywords" class="border-2 border-gray-200 p-3 w-full text-black text-base rounded-lg focus:outline-none" rows="10" readonly></textarea>
                        <button v-on:click="copyToClipboard(keywords)" class="bg-purple-500 text-white py-3 text-center w-full block mt-2 rounded font-semibold"><span v-if="!isSuccess"><i class="pi pi-copy me-2"></i>Copy Keyword</span><span v-if="isSuccess"><i class="pi pi-check me-2"></i>Copied</span></button>
                    </div>
                </div>
            </div>
            
        </div>

    </div>
  </template>
  
  <script>
  import axios from 'axios'

    export default {
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
          keywords:''
        }
      },
  
    methods: {
        copyToClipboard(key){
            console.log(key)
            if(key != ''){
                this.isSuccess = true
                setTimeout(() => {
                    this.isSuccess = false
                }, 1000);
                navigator.clipboard.writeText(key)
            }
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
            this.isLoading=true
            this.file = this.$refs.file.files[0];
            this.temporaryName= URL.createObjectURL(this.file)

            let formData = new FormData();
                
                formData.append('image', this.file);
                formData.append('content', "create title and 60 spesific and popular 1 word keyword from this picture for selling on microstock adobe stock, Separate keywords with commas, eliminate word 'vector, illustration', sort by most relevant, only provide title and keyword");
            
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Access-Control-Allow-Origin": "*",
                    }
                };

                axios.post('http://'+window.location.hostname+':3000/image/keyword-generate',
                    formData, axiosConfig
                ).then((res) => {
                    this.data = res.data
                    this.isLoading = false
                    this.isFinish = true

                    this.title = this.data.text.split('\n\n')[0].replace('**Title:**','').trim()
                    this.keywords = this.data.text.split('\n\n')[1].replace('**Keywords:**','').trim()
                })
                .catch(function(){
                    console.log('FAILURE!!');
                    this.isLoading = false
                });
            }
      },
      created(){
        document.title = "HapusLatar by Fadila Fitra Kusuma Jaya"
      }
    }
  </script>
  <style>
/* HTML: <div class="loader"></div> */
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