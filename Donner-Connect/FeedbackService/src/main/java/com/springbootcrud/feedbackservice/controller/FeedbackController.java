package com.springbootcrud.feedbackservice.controller;

import com.springbootcrud.feedbackservice.entity.Feedback;
import com.springbootcrud.feedbackservice.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping
    public String listFeedback(Model model) {
        List<Feedback> feedbackList = feedbackService.getAllFeedback();
        model.addAttribute("feedbackList", feedbackList);
        return "feedback-list";
    }

    @GetMapping("/new")
    public String showFeedbackForm(Model model) {
        Feedback feedback = new Feedback();
        model.addAttribute("feedback", feedback);
        return "feedback-form";
    }

    @PostMapping
    public String saveFeedback(@ModelAttribute("feedback") Feedback feedback) {
        feedbackService.saveFeedback(feedback);
        return "redirect:/feedback";
    }

    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable("id") Long id, Model model) {
        Feedback feedback = feedbackService.getFeedbackById(id);
        model.addAttribute("feedback", feedback);
        return "feedback-form";
    }

    @PostMapping("/{id}")
    public String updateFeedback(@PathVariable("id") Long id, @ModelAttribute("feedback") Feedback feedback) {
        feedbackService.updateFeedback(id, feedback);
        return "redirect:/feedback";
    }

    @GetMapping("/delete/{id}")
    public String deleteFeedback(@PathVariable("id") Long id) {
        feedbackService.deleteFeedback(id);
        return "redirect:/feedback";
    }

}

