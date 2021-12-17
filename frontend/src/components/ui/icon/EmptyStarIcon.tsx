import React, { FCX } from 'react'

type Props = {}

export const EmptyStarIcon: FCX<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      width="22"
      height="21"
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none">
      <g filter="url(#filter0_i_2692_76162)">
        <path
          d="M10.6788 1.46352C10.8284 1.00287 11.4801 1.00287 11.6298 1.46353L13.5117 7.25532C13.5786 7.46133 13.7706 7.60081 13.9872 7.60081H20.0771C20.5614 7.60081 20.7628 8.22062 20.371 8.50532L15.4442 12.0848C15.2689 12.2122 15.1956 12.4379 15.2625 12.6439L17.1444 18.4357C17.2941 18.8963 16.7668 19.2794 16.375 18.9947L11.4482 15.4152C11.2729 15.2878 11.0356 15.2878 10.8604 15.4152L5.93361 18.9947C5.54175 19.2794 5.01451 18.8963 5.16419 18.4357L7.04606 12.6439C7.11299 12.4379 7.03966 12.2122 6.86442 12.0848L1.93762 8.50532C1.54577 8.22062 1.74716 7.60081 2.23152 7.60081H8.32137C8.53799 7.60081 8.72996 7.46133 8.7969 7.25532L10.6788 1.46352Z"
          fill="white"
          fillOpacity="0.4"
        />
      </g>
      <path
        d="M13.9872 7.10081L12.1054 1.30902C11.806 0.387709 10.5026 0.387703 10.2032 1.30902L8.32137 7.10081H2.23152C1.2628 7.10081 0.860014 8.34043 1.64373 8.90983L6.57053 12.4894L4.68866 18.2812C4.38931 19.2025 5.44378 19.9686 6.2275 19.3992L11.1543 15.8197L16.0811 19.3992C16.8648 19.9686 17.9193 19.2025 17.6199 18.2812L15.7381 12.4894L20.6649 8.90983C21.4486 8.34043 21.0458 7.10081 20.0771 7.10081L13.9872 7.10081Z"
        stroke="#463E29"
        strokeOpacity="0.6"
      />
      <defs>
        <filter
          id="filter0_i_2692_76162"
          x="0.728516"
          y="0.11792"
          width="20.8516"
          height="21.979"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2692_76162" />
        </filter>
      </defs>
    </svg>
  )
}
