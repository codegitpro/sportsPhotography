package com.cl.controller;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.*;
import java.lang.*;
import java.math.*;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import com.cl.utils.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.cl.annotation.IgnoreAuth;
import com.cl.annotation.SysLog;

import com.cl.entity.RechargeRecordEntity;
import com.cl.entity.view.RechargeRecordView;

import com.cl.service.RechargeRecordService;
import com.cl.service.TokenService;

/**
 * 充值记录
 * 后端接口
 * @author 
 * @email 
 * @date 2026-03-12 19:47:42
 */
@RestController
@RequestMapping("/rechargerecord")
public class RechargeRecordController {
    @Autowired
    private RechargeRecordService rechargeRecordService;









    /**
     * 后台列表
     */
    @RequestMapping("/page")
    public R page(@RequestParam Map<String, Object> params,RechargeRecordEntity rechargeRecord,
                                                                                HttpServletRequest request){
                                    if(!request.getSession().getAttribute("role").toString().equals("管理员")) {
                    rechargeRecord.setUserid((Long)request.getSession().getAttribute("userId"));
                }
                            EntityWrapper<RechargeRecordEntity> ew = new EntityWrapper<RechargeRecordEntity>();
                                                                                                                    
        
        
        PageUtils page = rechargeRecordService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, rechargeRecord), params), params));
        Map<String, String> deSens = new HashMap<>();
                                                                                                //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(page,deSens);
        return R.ok().put("data", page);
    }







    /**
     * 前端列表
     */
	@IgnoreAuth
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params,RechargeRecordEntity rechargeRecord,
		HttpServletRequest request){
        EntityWrapper<RechargeRecordEntity> ew = new EntityWrapper<RechargeRecordEntity>();

		PageUtils page = rechargeRecordService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, rechargeRecord), params), params));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(page,deSens);
        return R.ok().put("data", page);
    }

	/**
     * 列表
     */
    @RequestMapping("/lists")
    public R list( RechargeRecordEntity rechargeRecord){
       	EntityWrapper<RechargeRecordEntity> ew = new EntityWrapper<RechargeRecordEntity>();
      	ew.allEq(MPUtil.allEQMapPre( rechargeRecord, MPUtil.camelToSnake("rechargeRecord")));
        return R.ok().put("data", rechargeRecordService.selectListView(ew));
    }

	 /**
     * 查询
     */
    @RequestMapping("/query")
    public R query(RechargeRecordEntity rechargeRecord){
        EntityWrapper< RechargeRecordEntity> ew = new EntityWrapper< RechargeRecordEntity>();
 		ew.allEq(MPUtil.allEQMapPre( rechargeRecord, MPUtil.camelToSnake("rechargeRecord")));
		RechargeRecordView rechargeRecordView =  rechargeRecordService.selectView(ew);
		return R.ok("查询充值记录成功").put("data", rechargeRecordView);
    }
	
    /**
     * 后端详情
     */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Long id){
        RechargeRecordEntity rechargeRecord = rechargeRecordService.selectById(id);
		rechargeRecord = rechargeRecordService.selectView(new EntityWrapper<RechargeRecordEntity>().eq("id", id));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(rechargeRecord,deSens);
        return R.ok().put("data", rechargeRecord);
    }

    /**
     * 前端详情
     */
	@IgnoreAuth
    @RequestMapping("/detail/{id}")
    public R detail(@PathVariable("id") Long id){
        RechargeRecordEntity rechargeRecord = rechargeRecordService.selectById(id);
		rechargeRecord = rechargeRecordService.selectView(new EntityWrapper<RechargeRecordEntity>().eq("id", id));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(rechargeRecord,deSens);
        return R.ok().put("data", rechargeRecord);
    }
    



    /**
     * 后端保存
     */
    @RequestMapping("/save")
    @SysLog("新增充值记录")
    public R save(@RequestBody RechargeRecordEntity rechargeRecord, HttpServletRequest request){
    	//ValidatorUtils.validateEntity(rechargeRecord);
        if(null == rechargeRecord.getUserid()){
            rechargeRecord.setUserid((Long) request.getSession().getAttribute("userId"));
        }
        rechargeRecordService.insert(rechargeRecord);
        return R.ok().put("data",rechargeRecord.getId());
    }
    
    /**
     * 前端保存
     */
    @SysLog("新增充值记录")
    @RequestMapping("/add")
    public R add(@RequestBody RechargeRecordEntity rechargeRecord, HttpServletRequest request){
    	//ValidatorUtils.validateEntity(rechargeRecord);
        if(null == rechargeRecord.getUserid()){
            rechargeRecord.setUserid((Long)request.getSession().getAttribute("userId"));
        }
        rechargeRecordService.insert(rechargeRecord);
        return R.ok();
    }


    /**
     * 修改
     */
    @RequestMapping("/update")
    @Transactional
    @SysLog("修改充值记录")
    public R update(@RequestBody RechargeRecordEntity rechargeRecord, HttpServletRequest request){
        //ValidatorUtils.validateEntity(rechargeRecord);
        rechargeRecordService.updateById(rechargeRecord);//全部更新
        return R.ok();
    }



    

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @SysLog("删除充值记录")
    public R delete(@RequestBody Long[] ids){
        rechargeRecordService.deleteBatchIds(Arrays.asList(ids));
        return R.ok();
    }

    	








}
