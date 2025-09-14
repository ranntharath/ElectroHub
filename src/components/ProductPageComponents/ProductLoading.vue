<template>


        <!-- Skeleton Card 1 -->
        <div class="bg-white rounded-xl shadow-sm">
            <div class="relative rounded-t-xl overflow-hidden">
                <div class="w-full h-64 bg-gray-200 animate-pulse rounded-t-xl"></div>
                <div class="absolute top-3 right-3 flex flex-col gap-2">
                    <div class="bg-gray-300 p-2 rounded-md w-10 h-10 animate-pulse"></div>
                    <div class="bg-gray-300 p-2 rounded-md w-10 h-10 animate-pulse"></div>
                </div>
                <div class="absolute top-3 left-3 bg-gray-300 px-3 py-1 rounded-md animate-pulse">
                    <div class="h-4 w-12 bg-gray-400 rounded animate-pulse"></div>
                </div>
            </div>
            <div class="text-start p-4 space-y-3">
                <div class="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div class="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div class="flex items-center space-x-2">
                    <div class="h-5 w-14 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        </div>

</template>
<style>
 @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
        }
        .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
</style>