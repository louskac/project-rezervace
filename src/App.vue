<template>
  <div id="app">
    <div class='w-full min-h-screen font-secondary text-color-text text-base bg-no-repeat bg-cover bg-hero-pattern after:backdrop-brightness-75'>

    <div id='header' class="flex justify-between items-center py-20 px-20 font-primary">
      <h1>Upcoming conference</h1>
      <div class="flex items-center space-x-10">
        <img src="./assets/google.png">
        <img src="./assets/apple.png">
      </div>
    </div>
 
    <div id='body' class="px-20 w-[80%]">
      <h2>The future of marketing in the AI driven world</h2>
      <div class="flex items-center">
        <div class="max-w-[50%]">
          <div class="text-color-contrast inline-block items-center py-10 w-[100%]">
            <span>Smarta Ladia</span><span class="md:float-right">15.2.2023</span>
          </div>
          <div id="text">
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ut tempus purus at lorem. Etiam neque. Integer malesuada. Integer vulputate sem a nibh rutrum consequat. Etiam egestas wisi a erat. Duis pulvinar. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Curabitur vitae diam non enim vestibulum interdum. Fusce aliquam vestibulum ipsum. Integer imperdiet lectus quis justo. Sed ac dolor sit amet purus malesuada congue.</p>
          </div>
          <div class="py-10">
            <button class="rounded-none btn1" @click="showModal = true">Rezervovat</button>
          </div> 
          <div class="max-w-[80%] absolute bottom-0 h-[80vh] left-[40%]">
            <img src="./assets/speakers/speaker1.png" alt="speaker1" class="h-full">
          </div>   
        </div>
      </div>
    </div>

    <div v-if="showModal" id="overlay" class="w-[100%] h-[100%] bg-color-dark/75 absolute top-0">
      <div id="modal" class="bg-color-text w-auto h-auto absolute top-[20%] left-[35%] text-center">
        <header style="background-color:#000;color:#fff;"><span class="close-button topright" @click="showModal = false">x</span></header>
        <div id="inputs" class="text-color-dark">
          <div class="py-5 px-5"><label for="">Jméno: </label><input type="text"></div>
          <div class="py-5 px-5"><label for="">Email: </label><input type="email"></div>
          <div class="py-5 px-5"><label for="">Místa: </label></div>
          <div class="grid-cols-{{ seatColumnsCount }} flex py-10 px-10">
            <div
              v-for="(col, colIndex) in seatColumnsCount"
                :key="colIndex"
              class="col-span-1"
            >
              <div
                v-for="(row, rowIndex) in seatRowsCount"
                v-bind:id="(rowIndex+1) + '/' + (colIndex+1)"
                :key="rowIndex"
                class="seat"
                :class="{ occupied: isSeatOccupied(rowIndex + 1, colIndex + 1) }"
                @click="selectSeat(rowIndex + 1, colIndex + 1)"
              >
                {{ rowIndex + 1 }} {{ seats[colIndex] }}
              </div>
            </div>
          </div>
        </div>
        <div class="inline-flex items-center py-10">
          <input type="submit" value="Registrovat" class="btn1 cursor-pointer"  @click="submit(), showModal = false">
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
  import {ref} from 'vue'

  const showModal = ref(false)
</script>

<script>
var seats = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
var maxSelectedCheck = 0;
export default {
  data() {
    return {
      seatRowsCount: 5,
      seatColumnsCount: 10,
      maxSelected: 2,
      occupiedSeats: [
        { row: 2, col: 4 },
        { row: 4, col: 8 },
      ],
    };
  },
  methods: {
    isSeatOccupied(row, col) {
      return this.occupiedSeats.some(
        seat => seat.row === row && seat.col === col
      );
    },

    selectSeat(row, col) {
      if (!this.isSeatOccupied(row, col)) {
        var id = row + '/' + col;
        var element = document.getElementById(id);

        if(element.classList.contains('picked')){
          element.classList.remove('picked');
          maxSelectedCheck--;
          return;
        }

        if(maxSelectedCheck == this.maxSelected){
          alert('You can select maximum of 2 seats');
          return;
        }else{
          maxSelectedCheck++;
        }

        element.classList.add("picked");
      }
    },

    submit(){
      var elements = document.getElementsByClassName('picked');

      for(var i = 0; i < this.maxSelected; i++){
        var id = elements[i].id;
        var parstId = id.split('/');
        console.log(parstId);
        this.occupiedSeats.push({ row: parseInt(parstId[0]), col: parseInt(parstId[1]) });
      }

      maxSelectedCheck = 0;
      alert('Rezervace proběhle úspěšně. Na email vám přijde potvrzení.')
    }
  },
};
</script>

<style>
.seat {
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.occupied {
  background-color: #ccc;
  cursor: not-allowed;
}

.close-button {
  border: none;
  display: inline-block;
  padding: 8px 16px;
  vertical-align: middle;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  background-color: inherit;
  text-align: center;
  cursor: pointer;
  white-space: nowrap
}

.topright {
  position: absolute;
  right: 0;
  top: 0
}

.picked {
  background-color: yellowgreen;
}
</style>
