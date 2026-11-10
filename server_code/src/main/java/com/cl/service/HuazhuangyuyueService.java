package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.HuazhuangyuyueEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.HuazhuangyuyueView;


/**
 * 化妆预约
 *
 * @author 
 * @email 
 * @date 2026-03-12 19:47:41
 */
public interface HuazhuangyuyueService extends IService<HuazhuangyuyueEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<HuazhuangyuyueView> selectListView(Wrapper<HuazhuangyuyueEntity> wrapper);
   	
   	HuazhuangyuyueView selectView(@Param("ew") Wrapper<HuazhuangyuyueEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<HuazhuangyuyueEntity> wrapper);
   	
   
    List<Map<String, Object>> selectValue(Map<String, Object> params,Wrapper<HuazhuangyuyueEntity> wrapper);

    List<Map<String, Object>> selectTimeStatValue(Map<String, Object> params,Wrapper<HuazhuangyuyueEntity> wrapper);

    List<Map<String, Object>> selectGroup(Map<String, Object> params,Wrapper<HuazhuangyuyueEntity> wrapper);



}

