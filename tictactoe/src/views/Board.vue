<template>
  <div class="gameBoard" style="">
    <h2 id="userHello"></h2>
    <h3 id="turn"></h3>
    <table class="center">
      <tr>
        <td><button class="tile" id="button_00"></button></td>
        <td><button class="tile" id="button_01"></button></td>
        <td><button class="tile" id="button_02"></button></td>
      </tr>
      <tr>
        <td><button class="tile" id="button_10"></button></td>
        <td><button class="tile" id="button_11"></button></td>
        <td><button class="tile" id="button_12"></button></td>
      </tr>
      <tr>
        <td><button class="tile" id="button_20"></button></td>
        <td><button class="tile" id="button_21"></button></td>
        <td><button class="tile" id="button_22"></button></td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  name: 'Board'
}
</script>
