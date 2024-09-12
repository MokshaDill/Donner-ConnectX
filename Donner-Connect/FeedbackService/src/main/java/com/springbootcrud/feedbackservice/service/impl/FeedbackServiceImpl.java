package com.springbootcrud.feedbackservice.service.impl;

import com.springbootcrud.feedbackservice.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.springbootcrud.feedbackservice.entity.Feedback;
import com.springbootcrud.feedbackservice.repository.FeedbackRepository;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Override
    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    @Override
    public Feedback updateFeedback(Long id, Feedback feedback) {
        Feedback existingFeedback = feedbackRepository.findById(id).orElseThrow(() -> new RuntimeException("Feedback not found"));
        existingFeedback.setUserImageUrl(feedback.getUserImageUrl());
        existingFeedback.setUserName(feedback.getUserName());
        existingFeedback.setFeedbackText(feedback.getFeedbackText());
        return feedbackRepository.save(existingFeedback);
    }

    @Override
    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }

    @Override
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    @Override
    public Feedback getFeedbackById(Long id) {
        return feedbackRepository.findById(id).orElseThrow(() -> new RuntimeException("Feedback not found"));
    }

}
