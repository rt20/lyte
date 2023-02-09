@extends('common::prerender.base')

<?php /** @var Common\Core\Prerender\MetaTags $meta */ ?>

@inject('settings', 'Common\Settings\Settings')

@section('body')
    @if ($content = $settings->getJson('homepage.appearance'))
        <h1 class="header-title">{{$content['headerTitle']}}</h1>
        <p class="header-description">{{$content['headerSubtitle']}}</p>

        <ul class="inline-features">
            @foreach($content['primaryFeatures'] as $primaryFeature)
                <li class="inline-feature">
                    <img src="{{url($primaryFeature['image'])}}" width="80px">
                    <h3>{{$primaryFeature['title']}}</h3>
                    <p>{{$primaryFeature['subtitle']}}</p>
                </li>
            @endforeach
        </ul>

        <ul class="big-features">
            @foreach($content['secondaryFeatures'] as $secondaryFeature)
                <li class="big-feature container" >
                    <img src="{{url($secondaryFeature['image'])}}" width="400px">
                    <section class="info">
                        <small>{{$secondaryFeature['subtitle']}}</small>
                        <h2>{{$secondaryFeature['title']}}</h2>
                        <p>{{$secondaryFeature['description']}}</p>
                    </section>
                </li>
            @endforeach
        </ul>

        <div class="bottom-cta">
            <div class="container">
                <h2 class="footer-title">{{$content['footerTitle']}}</h2>
                <p class="footer-description">{{$content['footerSubtitle']}}</p>
            </div>
        </div>
    @endif
@endsection