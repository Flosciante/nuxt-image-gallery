# NuxtHub Image Gallery Starter Template

This starter lets you get started with [NuxtHub Blob](https://hub.nuxt.com/docs/storage/blob) in seconds.

[![Deploy to NuxtHub](https://hub.nuxt.com/button.svg)](https://admin.hub.nuxt.com/new?template=image-gallery)

https://github.com/Flosciante/nuxt-image-gallery/assets/904724/6e2bafdf-f5a0-42cf-b1f8-1d11c6ec919f

## Features

- 📷 Image upload and display with [`hubBlob()`](http://hub.nuxt.com/docs/storage/blob)
- 🖼️ Image Filters: Apply a variety of filters to your images.
- 💾 Saving: Save your images with applied filters.
- 🌐 Cloud Storage: Blob powered by NuxtHub (cloudflare R2).
- 🎠 Custom Carousel: Includes a custom carousel component that can be adapted for in-house use.
- 🏃🏻 [View transition API](https://developer.chrome.com/docs/web-platform/view-transitions) The View Transitions API provides a mechanism for easily creating animated transitions between different DOM states while also updating the DOM contents in a single step.
- 🔑 [Nuxt Auth Utils](https://github.com/Atinux/nuxt-auth-utils) Minimalist Authentication module for Nuxt exposing Vue composables and server utils.

## Stack

- [NuxtHub](https://hub.nuxt.com) - A Nuxt toolkit to build fullstack applications on the edge
- [NuxtUI](https://ui.nuxt.com/getting-started) - A UI Library for Modern Web Apps
- [Nuxt Fonts](https://github.com/nuxt/fonts) - Plug-and-play custom web font optimization and configuration for Nuxt apps.
- [VueUse](https://github.com/antfu/vueuse) - Collection of useful composition APIs
- [ESLint](https://eslint.org/) with [@nuxt/eslint-config](https://github.com/nuxt/eslint), single quotes, no semi
- [TypeScript](https://www.typescriptlang.org/)

## Setup

1. Clone this repository to your local machine.
2. Install dependencies using the command `pnpm install` or your favorite package manager.
3. Run the application with the command `pnpm dev` or your favorite package manager.

> If you don't have pnpm installed, run: `corepack enable pnpm`

## Environment Variables

- `NUXT_ADMIN_PASSWORD` - A password to access the admin panel and upload images, will default to `admin` if not provided.
- `NUXT_SESSION_PASSWORD` - A secret key for session encryption used by [nuxt-auth-utils](https://github.com/Atinux/nuxt-auth-utils), will be generated automatically if not provided in development mode.

## Development

```bash
pnpm dev
```

### Remote Storage

Once you deployed your project, you can connect to your remote database locally running:

```bash
pnpm dev --remote
```

### Deploy

You can deploy this project on your Cloudflare account for free and with zero configuration using [NuxtHub](https://hub.nuxt.com).

```bash
npx nuxthub deploy
```

It's also possible to leverage Cloudflare Pages CI for deploying, learn more about the different options on https://hub.nuxt.com/docs/getting-started/deploy

Learn more about remote storage on https://hub.nuxt.com/docs/getting-started/remote-storage

## Template Starter

This project is a template starter provided by NuxtHub. It's designed to help kickstart your NuxtHub files project.

Check out the [deployment documentation](https://hub.nuxt.com/docs/getting-started/deploy) for more information.

## Contribution

Contributions are welcome! Feel free to open an issue to report a bug or submit a feature request via a pull request.

## Credits

Thanks to [Atinux](https://github.com/Atinux) for the contributions and advice provided.
