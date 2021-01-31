<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{

    /**
     * @Route("/{reactRouting}", name="home", defaults={"reactRouting": null})
     */
    public function index(): Response
    {
        return $this->render('default/index.html.twig', [
            'controller_name' => 'DefaultController',
        ]);
    }

    


    /**
     * @Route("/api/data", name="data")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */

    public function getData()
        {
            // //As i started with backend, I did this part at the beginning to handle the 10 days windows but this is now handle in the frontend.
            //I kept it in case something goes wrong with the frontend
            // ********************************************************************************
            date_default_timezone_set('Europe/Berlin');
            $dateToday = date('Y-m-d');
            $dateTenDays = date_create($dateToday)->modify('-10 days')->format('Y-m-d');
            // ********************************************************************************

            //Function console_log to debug
            // ********************************************************************************
            // function console_log($output, $with_script_tags = true) {
            //     $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . ');';
            //     if ($with_script_tags) {
            //         $js_code = '<script>' . $js_code . '</script>';
            //     }
            //     echo $js_code;
            // }
            // ********************************************************************************

            //Check if it recieves the day arguments by the client other uses the 10 days default windows
        if(isset($_GET['d1']) && isset($_GET['d2'])){
        $dateStart = $_GET['d1'];
        $dateEnd = $_GET['d2'];
        }else {
        $dateStart = $dateTenDays;
        $dateEnd = $dateToday;
        }

        //Uses curl to make the request to our external API with the dates needed
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, 'https://api.coindesk.com/v1/bpi/historical/close.json?start='.$dateStart.'&end='.$dateEnd);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($curl);

        //Create a new Response and send back our json file as response to the client
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->setContent($output);
        return $response;
    }
}
