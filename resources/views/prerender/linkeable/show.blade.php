@extends('common::prerender.base')

<?php
/** @var Common\Core\Prerender\MetaTags $meta */
?>

@inject('settings', 'Common\Settings\Settings')

@section('body')
    <h1>{{$meta->getTitle()}}</h1>
    <p>{{$meta->getDescription()}}</p>

    @if($image = $meta->getData('linkeable.image'))
        <img src="{{$image}}" alt="">
    @endif

    @if($page = $meta->getData('linkeable.custom_page'))
        <article>
            {!! $page['body'] !!}
        </article>
    @elseif($overlay = $meta->getData('linkeable.overlay'))
        <section>
            <div class="message">{{$overlay['message']}}</div>
            @if($btnText = $overlay['btn_text'])
                <a class="main-button" href="{{$overlay['btn_link']}}">{{$btnText}}</a>
            @endif
            <div class="ribbon-wrapper">
                <div class="ribbon">{{$overlay['label']}}</div>
            </div>
        </section>
    @elseif($links = $meta->getData('linkeable.links') ?? $meta->getData('linkeable.content'))
       <ul>
           @foreach($links as $link)
               <li>
                   @if($link->model_type === 'link')
                       <a href="{{$link->short_url}}" target="_blank">
                           <div class="long-url">
                               <img class="favicon-img" src="{{$link->image}}" alt="">
                               <span>{{$link->long_url}}</span>
                           </div>
                           <div class="short-url">{{$link->short_url}}</div>
                           @if($link->description)
                               <p class="link-description">{{$link->description}}</p>
                           @endif
                       </a>
                   @else
                    {{--link widget--}}
                   @endif
               </li>
           @endforeach
       </ul>
    @endif

    <a href="{{$meta->getData('linkeable.long_url')}}">{{__('Go to Link')}}</a>
@endsection
