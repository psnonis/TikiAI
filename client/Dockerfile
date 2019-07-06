# container for the Jetson AGX Xavier with JetPack 4.2
  FROM arm64v8/ubuntu:18.04

  MAINTAINER priyankara.nonis@berkeley.edu

# setup
  WORKDIR /tmp
  ARG DEBIAN_FRONTEND=noninteractive

# necessary tools
  RUN apt-get update
  RUN apt-get install -y apt-utils
  RUN apt-get install -y curl
  RUN apt-get install -y gnupg
  RUN apt-get install -y lbzip2
  RUN apt-get install -y sudo
  RUN apt-get install -y git
  RUN apt-get install -y automake
  RUN apt-get install -y autoconf
  RUN apt-get install -y libtool
  RUN apt-get install -y pkg-config
# RUN apt-get install -y software-properties-common
  RUN apt-get install -y iputils-ping
  RUN apt-get install -y x11-apps

# nvidia drivers
  RUN curl -sL https://developer.nvidia.com/embedded/dlc/l4t-jetson-driver-package-32-1-JAX-TX2 | tar xvfj -
  RUN sed -i 's,tar -I lbzip2 -xpmf ${LDK_NV_TEGRA_DIR}/config.tbz2,tar --exclude=etc/host* -I lbzip2 -xpmf ${LDK_NV_TEGRA_DIR}/config.tbz2,' ./Linux_for_Tegra/apply_binaries.sh
  RUN ./Linux_for_Tegra/apply_binaries.sh -r /
  RUN echo "/usr/lib/aarch64-linux-gnu/tegra"     > /etc/ld.so.conf.d/nvidia-tegra.conf
  RUN echo "/usr/lib/aarch64-linux-gnu/tegra"     > /usr/lib/aarch64-linux-gnu/tegra/ld.so.conf
  RUN echo "/usr/lib/aarch64-linux-gnu/tegra-egl" > /usr/lib/aarch64-linux-gnu/tegra-egl/ld.so.conf
  RUN update-alternatives --install \
      /etc/ld.so.conf.d/aarch64-linux-gnu_GL.conf aarch64-linux-gnu_gl_conf \
      /usr/lib/aarch64-linux-gnu/tegra/ld.so.conf 1000
  RUN update-alternatives --install \
      /etc/ld.so.conf.d/aarch64-linux-gnu_EGL.conf aarch64-linux-gnu_egl_conf \
      /usr/lib/aarch64-linux-gnu/tegra-egl/ld.so.conf 1000
  RUN rm -rf ./Linux_for_Tegra

# cuda
  COPY jetpack/cuda-repo-l4t-10-0-local-10.0.166_1.0-1_arm64.deb /tmp

  RUN apt-get install -y /tmp/cuda-repo-l4t-10-0-local-10.0.166_1.0-1_arm64.deb
  RUN apt-key add /var/cuda-repo-10-0-local-10.0.166/7fa2af80.pub
  RUN apt-get update
  RUN apt-get install -y cuda-toolkit-10.0

  RUN rm -rf /etc/apt/sources.list.d/cuda-10-0-local-10.0.166.list
  RUN rm -rf /var/cuda-repo-10-0-local-10.0.166

# cudnn
  COPY jetpack/libcudnn7_7.3.1.28-1+cuda10.0_arm64.deb     /tmp
  COPY jetpack/libcudnn7-dev_7.3.1.28-1+cuda10.0_arm64.deb /tmp

  RUN apt-get install -y /tmp/libcudnn7_7.3.1.28-1+cuda10.0_arm64.deb
  RUN apt-get install -y /tmp/libcudnn7-dev_7.3.1.28-1+cuda10.0_arm64.deb

# opencv
  COPY jetpack/libopencv_3.3.1-2-g31ccdfe11_arm64.deb        /tmp
  COPY jetpack/libopencv-dev_3.3.1-2-g31ccdfe11_arm64.deb    /tmp
  COPY jetpack/libopencv-python_3.3.1-2-g31ccdfe11_arm64.deb /tmp

  RUN apt-get update
  RUN apt-get install -y python3-numpy
  RUN apt-get install -y /tmp/libopencv_3.3.1-2-g31ccdfe11_arm64.deb
  RUN apt-get install -y /tmp/libopencv-dev_3.3.1-2-g31ccdfe11_arm64.deb
  RUN apt-get install -y /tmp/libopencv-python_3.3.1-2-g31ccdfe11_arm64.deb
  RUN apt-get install -y python3-opencv
  RUN apt-get install -y python3-wheel

# tensorrt
  COPY jetpack/libnvinfer5_5.0.6-1+cuda10.0_arm64.deb            /tmp
  COPY jetpack/libnvinfer-dev_5.0.6-1+cuda10.0_arm64.deb         /tmp
  COPY jetpack/libnvinfer-samples_5.0.6-1+cuda10.0_all.deb       /tmp
# COPY jetpack/python-libnvinfer_5.0.6-1+cuda10.0_arm64.deb      /tmp
# COPY jetpack/python-libnvinfer-dev_5.0.6-1+cuda10.0_arm64.deb  /tmp
  COPY jetpack/python3-libnvinfer_5.0.6-1+cuda10.0_arm64.deb     /tmp
  COPY jetpack/python3-libnvinfer-dev_5.0.6-1+cuda10.0_arm64.deb /tmp
  COPY jetpack/tensorrt_5.0.6.3-1+cuda10.0_arm64.deb             /tmp

  RUN apt-get update
  RUN apt-get install -y /tmp/libnvinfer5_5.0.6-1+cuda10.0_arm64.deb
  RUN apt-get install -y /tmp/libnvinfer-dev_5.0.6-1+cuda10.0_arm64.deb
  RUN apt-get install -y /tmp/libnvinfer-samples_5.0.6-1+cuda10.0_all.deb
# RUN apt-get install -y /tmp/python-libnvinfer_5.0.6-1+cuda10.0_arm64.deb
# RUN apt-get install -y /tmp/python-libnvinfer-dev_5.0.6-1+cuda10.0_arm64.deb
  RUN apt-get install -y /tmp/python3-libnvinfer_5.0.6-1+cuda10.0_arm64.deb
  RUN apt-get install -y /tmp/python3-libnvinfer-dev_5.0.6-1+cuda10.0_arm64.deb
  RUN apt-get install -y /tmp/tensorrt_5.0.6.3-1+cuda10.0_arm64.deb

# install libglvnd
  WORKDIR /tmp
  RUN apt-get install -q -y libxext-dev libx11-dev x11proto-gl-dev
  RUN git clone https://github.com/NVIDIA/libglvnd.git
  WORKDIR /tmp/libglvnd
  RUN ./autogen.sh
  RUN ./configure
  RUN make -j 6
  RUN make install
  RUN rm -rf /tmp/libglvnd

# create required softlinks
  WORKDIR /
  RUN rm -f /usr/lib/aarch64-linux-gnu/libGL.so
  RUN ln -s /usr/lib/aarch64-linux-gnu/libGLU.so                                /usr/lib/aarch64-linux-gnu/libGL.so
  RUN ln -s /usr/lib/aarch64-linux-gnu/libcuda.so                               /usr/lib/aarch64-linux-gnu/libcuda.so.1
# RUN ln -s /usr/lib/aarch64-linux-gnu/tegra/libnvidia-ptxjitcompiler.so.32.1.0 /usr/lib/aarch64-linux-gnu/tegra/libnvidia-ptxjitcompiler.so.1

# setup environment
  ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib/aarch64-linux-gnu/tegra
  ENV PATH=.:/usr/local/cuda-10.0/bin:$PATH

# install application dependencies
  RUN apt-get install -q -y python3-dev
  RUN apt-get install -q -y python3-pip

# install application dependencies
  RUN pip3 install paho-mqtt

# cleanup
  RUN rm -rf /tmp/*.deb
  RUN rm -rf /var/lib/apt/lists/*
  RUN rm -rf /var/cache/apt
  RUN apt-get -y autoremove
  RUN apt-get -y autoclean

  CMD ["bash"]
