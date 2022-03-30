# <프로젝트 명> StyleGAN2-ADA

[TOC]

## StyleGAN 이란?

> A Style-Based Generator Architecture for Generative Adversarial Networks
>
> StyleGAN 은 PGGAN 구조에서 **Style transfer** 개념을 적용하여 generator architecture 를 재구성한 구조
>
> Reference
>
> - paper : https://arxiv.org/abs/1812.04948
> - official code : https://github.com/NVlabs/stylegan
> - https://blog.promedius.ai/stylegan_1/

- 새로운 아키텍처는 자동으로 학습되고 비지도의 높은 수준의 속성(e.g., pose and identity when trained on human faces)과 생성된 이미지(e.g., 주근깨, 머리카락)의 stochastic variation을 separation하고 직관적으로 scale-specific control이 가능하게 한다.
- 새로운 generator는 traditional distribution quality metrics 측면에서 SOTA을 향상 시키고 더 나은 interpolation properties을 입증하며 latent factor of variation을 더 잘 disentangled 하게 한다.
- Interpolation quality와 disentanglement을 정량화(quantify) 하기 위해 모든 generator 아키텍처에 사용할 수 있는 두기자 새로운 자동화된 방법을 제안한다.



## PGGAN

- PGGAN 구조
  - ![image-20220314105150088](.\README.assets\image-20220314105150088.png)
- PGGAN 은 구조와 같이 점진적으로 낮은 해상도부터 높은 해상도까지 점진적으로 생성한다.
- Latent vector z 가 Normalize 을 거쳐서 모델에 바로 입력된다.
- z 가 Generator 에 직접 입력되면 GAN 은 latent space 가 학습 데이터셋의 확률분포와 비슷한 형태로 만들어지도록 학습한다. => latent space 가 entangle 하게 됨
  - Entangle : 각 특징들이 서로 얽혀있어 구분하기 어려운 상태
  - Distangle : 각 style 특징이 잘 구분되어 있는 상태. 선형적으로 변수를 변경했을 시 어떤 결과물의 feature 인지 예측 가능한 상태
- ![image-20220314110705609](.\README.assets\image-20220314110705609.png)
- 예시로 학습 데이터 셋을 검정색이며 안경 미착용 동양인이라고 한다.
- PGGAN 처럼 latent varialble 을 기반으로 학습하는 생성 모델은 noise 상태인 latent space Z 을 학습 데이터 분포와 비슷하게 변화시키는 mapping 을 학습하는 것을 목표로 한다.
- 만약 학습 데이터셋에 없는 데이터 분포를 생성하기는, latent space 가 non-linear 하게 mapping 된 상태이기 때문에 어렵다.



## PGGAN 의 이미지 생성

- 학습된 모델로 이미지를 생성할 경우, latent variable 기반 생성모델은 Gaussian 분포 형태의 random noise 입력으로 넣어주게 된다.
- 그림 2 (a) 의 비어있는 상태에서 (모든 특징을 포용하지 않은 상태) mapping 을 시킴으로써 wrapping 이 발생하게 된다.
- wrapping 이 발생하게 되면 생성된 이미지의 특징이 예측할 수 없을 정도로 급변하게 된다.



## StyleGAN

- 기존 PGGAN 의 Generator 의 단점 : latent vector z 가 바로 입력되기 때문에 entangle 하게 되어 style 변경이 불가능 하다.
- 때문에 StyleGAN 에서는 **style transfer** 처럼 원하는 style 을 수치화 시켜 GAN 에 적용한다.
- style 을 여러 scale 에 넣어서 학습시키는 방법이다.
- ![image-20220314204310277](.\README.assets\image-20220314204310277.png)
- 기존 latent variable 기반의 모델은 Gaussian Random Noise 를 입력으로 넣어주게 되며, 그로인해 latent space 가 **entangled** 하게 된다.
- **Mapping Network** : GAN 모델에 **z** 를 바로 넣어주지 않고 학습 데이터셋과 비슷한 분포를 갖도록, Mapping Network 를 이용하여 **non-linear** mapping 된 **w** 를 각 scale 에 입력으로 넣어서 학습시킨다.
- Mapping Network 를 통해 나온 w 는 정확하지는 않지만 학습 데이터셋의 확률 분포와 비슷한 모양으로 mapping 된 상태이기 때문에, 그림 4 (c) 처럼 **w** 가 disentangle 하게 된다.
- ![image-20220314205710849](.\README.assets\image-20220314205710849.png)
- Mapping Network 를 통해 mapping 된 **w** 는 Affine Transformation 을 거쳐 shape 을 맞추고 style 을 입혀준다.

### AdaIN

>Arbitrary Style Transfer in Real-Time With Adaptive Instance Normalization
>
>Neural Network 에서 각 layer 를 지나면서 scale, variance 의 변화가 생길 수 있다. 이때 Normalization 방법을 각 layer에 사용한다. (AdaIN 도 같은 역할을 한다.)
>
>Reference
>
>- https://www.notion.so/AdaIN-Arbitrary-Style-Transfer-in-Real-Time-With-Adaptive-Instance-Normalization-9fe8b5fb60154380b6fbe3147e0afe9e
>- https://openaccess.thecvf.com/content_ICCV_2017/papers/Huang_Arbitrary_Style_Transfer_ICCV_2017_paper.pdf



- **AdaIN 수식**

  - 

  $$
  AdaIn(x_i, y) = y_{s,i}\frac{x_i-\mu(x_i)}{\sigma(x_i)}+y_{b,i}
  \\ (y_{s,i}: Linear\;coefficient,\; y_{b,i}: Bias)
  $$

  - 수식해석 : Input (xi) 에 평균을 빼고 표준편차로 나눈 값에 Bias 를 더함 => Random variable 을 정규화 시킴 (즉, instance 에 대해 normalization)

- ![image-20220314211325260](.\README.assets\image-20220314211325260.png)

- ![image-20220314211422754](.\README.assets\image-20220314211422754.png)

- 한정적인 Style Transfer 만 가능한 기존의 Feed-forward 방식에서 진화되어, 빠른속도로 추론이 가능하면서 동시에 Arbitary 하게 새로운 스타일을 적용할 수 있는 방식

- AdaIN 은 적용가능 한 style 도 무한정이며, 추론도 빠른속도로 이루어진다.

- AdaIN 구조

  - ![image-20220314211451899](.\README.assets\image-20220314211451899.png)

