<script setup>

</script>

<template>
  <div class="d-flex align-items-center">
    <form class="d-flex align-items-center gap-2">
      <!-- Smaller Username Input -->
      <input
          id="username"
          type="text"
          placeholder="Username"
          class="form-control form-control-sm"
          style="width: 100px;"
          value=""
      />

      <!-- Smaller Password Input -->
      <input
          id="password"
          type="password"
          placeholder="Password"
          class="form-control form-control-sm"
          style="width: 100px;"
          value=""
      />

      <!-- Smaller Log In Button -->
      <button
          class="btn btn-outline-secondary btn-sm text-nowrap"
          type="submit">
        Log in
      </button>

      <!-- Smaller Register Button -->
      <button
          class="btn btn-outline-secondary btn-sm text-nowrap"
          type="submit">
        Register
      </button>

      <!-- Smaller Bag Button -->
      <button
          class="btn btn-outline-secondary btn-sm position-relative text-nowrap"
          type="submit">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            class="bi bi-bag"
            viewBox="0 0 16 16">
          <path
              d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"
          />
        </svg>
        <span
            class="badge bg-secondary position-absolute top-0 start-100 translate-middle">
        4
      </span>
      </button>
    </form>
  </div>


</template>

<style scoped>

</style>