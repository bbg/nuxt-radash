<script setup>
const fish = [
  {
    name: "Marlin",
    weight: 105,
    source: "ocean",
  },
  {
    name: "Bass",
    weight: 8,
    source: "lake",
  },
  {
    name: "Trout",
    weight: 1,
    source: "lake",
  },
];

const ra = {
  Mode: "god",
  Power: "sun",
};

const min = _Min(fish, (f) => f.weight);
const text = _Pascal("it works!");
const lowerize = _Lowerize(ra);
const snake = stringToSnake('green fish blue fish')
</script>

<template>
  <div>{{ text }}</div>
  <pre>{{ min }}</pre>
  <pre>{{ lowerize }}</pre>
  <pre>{{ snake }}</pre>
</template>
