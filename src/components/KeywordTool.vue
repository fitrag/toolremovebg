<template>
    <div class="">
        <div class="flex items-center justify-center px-10 py-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white h-screen">
            <div class="w-[50%] hidden md:hidden lg:hiddenn xl:block">
                <h1 class="text-[45px] font-bold mb-[20px]">KeywordMaster</h1>
                <div class="">
                    <p class="text-2xl">
                        Temukan kata kunci terbaik untuk meningkatkan visibilitas dan peringkat konten Anda. Alat cerdas ini memberikan ide kata kunci yang relevan, tren pencarian, dan analitik mendalam untuk strategi SEO yang optimal. Maksimalkan potensi pencarian dengan hasil yang akurat dan cepat!
                    </p>
                </div>
            </div>
            <div class="flex-1">
                <div class="flex justfy-center items-center flex-col">
                    <div class="">
                        <div v-if="!isFilled">
                            <div class="flex flex-col bg-white w-[600px] p-10 rounded-xl text-black shadow-md">
                                <label for="" class="mb-3 block font-semibold">Masukan judul</label>
                                <input type="text" v-model="title" class="block p-4 w-full border-2 border-gray-200 rounded-lg focus:outline-none">
                                <button v-on:click="getKeyword()" class="bg-purple-500 text-white py-3 text-center w-full block mt-2 rounded font-semibold"><i class="pi pi-search me-2"></i>Temukan Keyword</button>
                            </div>
                        </div>
                        <div class="flex flex-col bg-white w-[600px] p-10 rounded-xl text-black shadow-md mt-[10px]">
                            <label for="" class="mb-3 block font-semibold">{{ this.data.length }} Keywords</label>
                            <textarea v-model="keywordArea" class="border-2 border-gray-200 p-3 w-full text-black text-base rounded-lg focus:outline-none" rows="10" readonly></textarea>
                            <button v-on:click="copyToClipboard(keywordArea)" class="bg-purple-500 text-white py-3 text-center w-full block mt-2 rounded font-semibold"><span v-if="!isSuccess"><i class="pi pi-copy me-2"></i>Copy Keyword</span><span v-if="isSuccess"><i class="pi pi-check me-2"></i>Copied</span></button>
                        </div>
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
          data:'',
          title:'',
          keywordArea:'',
          isLoading:false,
          isFinish:false,
          host:window.location.hostname,
          isSuccess:false
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
        getKeyword(){
            let axiosConfig = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                }
            };

            axios.post('http://'+window.location.hostname+':3000/keyword/generate',
                {
                    'content':"create 60 spesific and popular 1 word keyword from this title '"+this.title+"' for selling on microstock adobe stock, Separate keywords with commas, eliminate word 'vector, illustration', sort by most relevant"
                }, axiosConfig
            ).then((res) => {
                this.keywordArea = res.data.keyword.trim()
                this.data = res.data.keyword.trim().split(',')
            })
            .catch(function(){
                console.log('FAILURE!!');
            });
        },
  
        handleFileUpload(){

            this.isFilled=true
            this.isLoading=true
            this.file = this.$refs.file.files[0];
            this.temporaryName= URL.createObjectURL(this.file)

            let formData = new FormData();
                
                formData.append('image', this.file);
            
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Access-Control-Allow-Origin": "*",
                    }
                };

                axios.post('http://'+window.location.hostname+':3000/remove',
                    formData, axiosConfig
                ).then((res) => {
                    this.data = res.data
                    this.isLoading = false
                    this.isFinish = true
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